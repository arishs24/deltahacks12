import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';

const nextConfig: NextConfig = {
  // GitHub Pages configuration
  ...(isGitHubPages && {
    output: 'export',
    basePath: repositoryName ? `/${repositoryName}` : '',
    assetPrefix: repositoryName ? `/${repositoryName}` : '',
    images: {
      unoptimized: true, // Required for static export
    },
    trailingSlash: true, // Required for GitHub Pages
  }),
  
  
  // Optimize bundle size for Vercel
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude large client-side dependencies from server bundles (API routes)
      // Three.js libraries should not be bundled in serverless functions
      const originalExternals = config.externals;
      
      // Three.js packages to exclude from server bundles
      const threeJsPackages = ['three', '@react-three/fiber', '@react-three/drei'];
      
      config.externals = [
        ...(Array.isArray(originalExternals) ? originalExternals : [originalExternals].filter(Boolean)),
        // Exclude Three.js libraries
        ({ request }: { request?: string }, callback: (err?: Error | null, result?: string) => void) => {
          if (request && threeJsPackages.some(pkg => request === pkg || request.startsWith(`${pkg}/`))) {
            return callback(null, `commonjs ${request}`);
          }
          callback();
        },
      ];
    }
    
    // Optimize chunk splitting for client bundles
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            // Separate large Three.js libraries
            three: {
              name: 'three',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              priority: 30,
              chunks: 'async',
            },
            // Separate MongoDB (only used server-side)
            mongodb: {
              name: 'mongodb',
              test: /[\\/]node_modules[\\/]mongodb[\\/]/,
              priority: 20,
              chunks: 'all',
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // Exclude cache and git from serverless function output
    outputFileTracingExcludes: {
      '*': [
        '.next/cache/**',
        '.git/**',
        'node_modules/.cache/**',
      ],
    },
  },
};

export default nextConfig;
