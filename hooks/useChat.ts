import { useState, useCallback, useEffect } from 'react';
import { fetchAnswer } from '@/lib/answer';
import { getCommonConfig } from '@/lib/chat-config';
import { branding } from '@/lib/branding-config';
import { logger } from '@/lib/logger';
import { CHAT_CONSTANTS } from '@/lib/constants';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isOffline?: boolean;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface UseChatReturn {
  // Messages
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  
  // Chat actions
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
  
  // Chat history
  chatHistories: ChatHistory[];
  activeChat: string | null;
  startNewChat: () => void;
  switchChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  
  // Connection status
  isOnline: boolean;
}

const STORAGE_KEY = branding.getChatDataStorageKey();

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Generate chat title from first message
const generateChatTitle = (firstMessage: string): string => {
  return firstMessage.length > 50 
    ? firstMessage.substring(0, 47) + '...' 
    : firstMessage;
};

// Load data from localStorage
const loadChatData = (): { histories: ChatHistory[]; activeId: string | null } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Parse dates back from strings
      const histories = data.histories.map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      return { histories, activeId: data.activeId };
    }
  } catch (error) {
    logger.error('Error loading chat data:', error);
  }
  return { histories: [], activeId: null };
};

// Save data to localStorage
const saveChatData = (histories: ChatHistory[], activeId: string | null) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      histories,
      activeId,
      lastSaved: new Date().toISOString()
    }));
  } catch (error) {
    logger.error('Error saving chat data:', error);
  }
};

export default function useChat(): UseChatReturn {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  
  const commonConfig = getCommonConfig();

  // Load data on mount
  useEffect(() => {
    const { histories, activeId } = loadChatData();
    setChatHistories(histories);
    
    if (activeId && histories.find(h => h.id === activeId)) {
      setActiveChat(activeId);
    } else if (histories.length > 0) {
      setActiveChat(histories[0].id);
    }
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (chatHistories.length > 0 || activeChat) {
      saveChatData(chatHistories, activeChat);
    }
  }, [chatHistories, activeChat]);

  // Get current chat messages
  const messages = activeChat 
    ? chatHistories.find(h => h.id === activeChat)?.messages || []
    : [];

  // Send message
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    setError(null);
    
    // Create user message
    const userMessage: Message = {
      id: generateId(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      isOffline: !isOnline
    };

    // If no active chat, create new one
    let currentChatId = activeChat;
    if (!currentChatId) {
      const newChat: ChatHistory = {
        id: generateId(),
        title: generateChatTitle(text),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setChatHistories(prev => [newChat, ...prev]);
      setActiveChat(newChat.id);
      currentChatId = newChat.id;
    }

    // Add user message to chat
    setChatHistories(prev => prev.map(chat => 
      chat.id === currentChatId
        ? {
            ...chat,
            messages: [...chat.messages, userMessage],
            updatedAt: new Date(),
            title: chat.messages.length === 0 ? generateChatTitle(text) : chat.title
          }
        : chat
    ));

    // If offline, don't try to get AI response
    if (!isOnline) {
      return;
    }

    setIsLoading(true);

    try {
      // Get chat history for context (last N messages)
      const currentChat = chatHistories.find(h => h.id === currentChatId);
      const chatHistory = currentChat?.messages.slice(-CHAT_CONSTANTS.MAX_MESSAGES_IN_HISTORY).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })) || [];

      // Add current user message to history
      chatHistory.push({ role: 'user', content: text });

      // Call AI API using the new configuration system
      // The config/api-config.json file now handles all these parameters
      const response = await fetchAnswer({
        query: text,
        chatHistory,
        // Fallback parameters for backward compatibility
        namespace: commonConfig.api.namespace,
        top_k: commonConfig.api.topK,
        aiModel: commonConfig.api.model,
        temperature: commonConfig.api.temperature,
        threshold: commonConfig.api.threshold,
      });

      // Create AI message
      const aiMessage: Message = {
        id: generateId(),
        text: response.answer || response.response || "I'm sorry, I couldn't generate a response.",
        sender: 'ai',
        timestamp: new Date()
      };

      // Add AI message to chat
      setChatHistories(prev => prev.map(chat => 
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, aiMessage],
              updatedAt: new Date()
            }
          : chat
      ));

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      
      // Add error message to chat
      const errorAiMessage: Message = {
        id: generateId(),
        text: `Sorry, I encountered an error: ${errorMessage}`,
        sender: 'ai',
        timestamp: new Date()
      };

      setChatHistories(prev => prev.map(chat => 
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, errorAiMessage],
              updatedAt: new Date()
            }
          : chat
      ));
    } finally {
      setIsLoading(false);
    }
  }, [activeChat, chatHistories, isOnline, commonConfig]);

  // Clear messages in current chat
  const clearMessages = useCallback(() => {
    if (!activeChat) return;
    
    setChatHistories(prev => prev.map(chat => 
      chat.id === activeChat
        ? {
            ...chat,
            messages: [],
            updatedAt: new Date()
          }
        : chat
    ));
  }, [activeChat]);

  // Start new chat
  const startNewChat = useCallback(() => {
    const newChat: ChatHistory = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setChatHistories(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
    setError(null);
  }, []);

  // Switch to different chat
  const switchChat = useCallback((chatId: string) => {
    const chatExists = chatHistories.find(h => h.id === chatId);
    if (chatExists) {
      setActiveChat(chatId);
      setError(null);
    }
  }, [chatHistories]);

  // Delete chat
  const deleteChat = useCallback((chatId: string) => {
    setChatHistories(prev => {
      const filtered = prev.filter(chat => chat.id !== chatId);
      
      // If we deleted the active chat, switch to another one
      if (activeChat === chatId) {
        const newActive = filtered.length > 0 ? filtered[0].id : null;
        setActiveChat(newActive);
      }
      
      return filtered;
    });
  }, [activeChat]);

  return {
    // Messages
    messages,
    isLoading,
    error,
    
    // Chat actions
    sendMessage,
    clearMessages,
    
    // Chat history
    chatHistories,
    activeChat,
    startNewChat,
    switchChat,
    deleteChat,
    
    // Connection status
    isOnline
  };
} 