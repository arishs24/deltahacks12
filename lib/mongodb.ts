import { MongoClient, MongoClientOptions } from 'mongodb';

/**
 * MongoDB Connection Utility
 * 
 * Robust MongoDB Atlas connection handler with Windows-specific TLS fixes
 * and automatic connection retry/error recovery.
 * 
 * Server-side only: This file should NEVER be imported in client-side code.
 */

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

/**
 * Prepare MongoDB connection string
 * Note: TLS options are set in MongoClientOptions, not connection string
 * to avoid conflicts on Windows
 */
function prepareConnectionString(originalUri: string): string {
  return originalUri.trim();
}

/**
 * Create MongoDB client with optimized options
 */
function createMongoClient(uri: string): MongoClient {
  const isWindows = process.platform === 'win32';
  
  const options: MongoClientOptions = {
    // Connection timeouts
    serverSelectionTimeoutMS: 15000, // Increased for reliability
    socketTimeoutMS: 45000,
    connectTimeoutMS: 15000,
    
    // Retry configuration
    retryWrites: true,
    retryReads: true,
    
    // Connection pool settings
    maxPoolSize: 10,
    minPoolSize: 1,
    
    // Windows-specific TLS fix: Set TLS options directly in options object
    // This overrides connection string TLS settings and works around OpenSSL 3.0 issues
    ...(isWindows && {
      tls: true,
      tlsAllowInvalidCertificates: true, // Required for Windows + OpenSSL 3.0 compatibility
      tlsAllowInvalidHostnames: true,    // Also allow invalid hostnames
    }),
  };

  return new MongoClient(uri, options);
}

/**
 * Test connection health
 */
async function testConnection(client: MongoClient): Promise<boolean> {
  try {
    await client.db('admin').command({ ping: 1 });
    return true;
  } catch (error) {
    return false;
  }
}

// Prepare the connection string once
const connectionString = prepareConnectionString(process.env.MONGODB_URI);

// Debug: Log connection string (without credentials) for troubleshooting
if (process.env.NODE_ENV === 'development') {
  const maskedUri = connectionString.replace(/(mongodb\+srv?:\/\/)([^:]+):([^@]+)@/, '$1***:***@');
  console.log('🔧 MongoDB connection string prepared:', maskedUri.substring(0, 100) + '...');
  console.log('🔧 Platform:', process.platform);
  console.log('🔧 Node version:', process.version);
}

// Global connection management
let client: MongoClient | null = null;
let activeConnectionPromise: Promise<MongoClient> | null = null;
let isConnecting = false;

/**
 * Get or create MongoDB client connection
 * Includes automatic retry and error recovery
 */
async function getClient(): Promise<MongoClient> {
  // If we have a connected client, verify it's still healthy
  if (client) {
    try {
      const isHealthy = await testConnection(client);
      if (isHealthy) {
        return client;
      } else {
        // Connection is unhealthy, close it and create a new one
        console.warn('MongoDB connection unhealthy, reconnecting...');
        try {
          await client.close();
        } catch (e) {
          // Ignore close errors
        }
        client = null;
        activeConnectionPromise = null;
      }
    } catch (error) {
      // Test failed, close and recreate
      console.warn('MongoDB connection test failed, reconnecting...', error);
      const clientToClose = client; // Store reference before nulling
      client = null;
      activeConnectionPromise = null;
      try {
        if (clientToClose) {
          await clientToClose.close();
        }
      } catch (e) {
        // Ignore close errors
      }
    }
  }

  // If we're already connecting, wait for that promise
  if (isConnecting && activeConnectionPromise) {
    return activeConnectionPromise;
  }

  // Create new connection
  isConnecting = true;
  activeConnectionPromise = (async () => {
    try {
      const newClient = createMongoClient(connectionString);
      
      // Connect with retry logic
      let lastError: Error | null = null;
      const maxRetries = 3;
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          await newClient.connect();
          
          // Verify connection works
          const isHealthy = await testConnection(newClient);
          if (isHealthy) {
            client = newClient;
            isConnecting = false;
            console.log('✅ MongoDB connected successfully');
            return newClient;
          } else {
            throw new Error('Connection test failed');
          }
        } catch (error) {
          lastError = error as Error;
          console.warn(`MongoDB connection attempt ${attempt}/${maxRetries} failed:`, error);
          
          if (attempt < maxRetries) {
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            // Close the failed client before retrying
            try {
              await newClient.close();
            } catch (e) {
              // Ignore
            }
          }
        }
      }
      
      // All retries failed
      isConnecting = false;
      activeConnectionPromise = null;
      throw new Error(`Failed to connect to MongoDB after ${maxRetries} attempts: ${lastError?.message}`);
    } catch (error) {
      isConnecting = false;
      activeConnectionPromise = null;
      throw error;
    }
  })();

  return activeConnectionPromise;
}

// Create the client promise based on environment
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Development mode: Use global variable to persist across HMR
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
    _mongoClientPromise?: Promise<MongoClient>;
    _mongoConnectionString?: string; // Track connection string to detect changes
  };

  // Check if connection string changed or if we need a fresh connection
  const needsNewConnection = 
    !globalWithMongo._mongoClientPromise || 
    globalWithMongo._mongoConnectionString !== connectionString;

  if (needsNewConnection) {
    // Clear old connection if it exists
    if (globalWithMongo._mongoClient) {
      try {
        globalWithMongo._mongoClient.close().catch(() => {});
      } catch (e) {
        // Ignore
      }
    }
    
    // Create new connection promise and cache it
    console.log('🔄 Creating new MongoDB connection...');
    clientPromise = getClient();
    globalWithMongo._mongoClientPromise = clientPromise;
    globalWithMongo._mongoConnectionString = connectionString;
    
    // Handle promise rejection to clear cache on failure
    clientPromise.catch((error) => {
      console.error('❌ MongoDB connection failed, clearing cache:', error);
      globalWithMongo._mongoClientPromise = undefined;
      globalWithMongo._mongoClient = undefined;
      globalWithMongo._mongoConnectionString = undefined;
    });
  } else {
    // Use cached promise (guaranteed to exist due to check above)
    clientPromise = globalWithMongo._mongoClientPromise!;
  }
} else {
  // Production: Create connection on first use
  clientPromise = getClient();
}

// Export the client promise
export default clientPromise;
