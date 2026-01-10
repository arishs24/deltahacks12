'use client';

import { useEffect, useState } from 'react';
import { getChatType, validateChatConfig } from '../../lib/chat-config';
import { ChatWidget } from './chat-widget';
import ChatWindow from './chat-interface/ChatWindow';
import { logger } from '../../lib/logger';

export default function DynamicChat() {
  const [chatType, setChatType] = useState<'widget' | 'interface' | null>(null);
  const [configValid, setConfigValid] = useState(false);

  useEffect(() => {
    // Validate configuration on mount
    const isValid = validateChatConfig();
    setConfigValid(isValid);
    
    if (isValid) {
      setChatType(getChatType());
    } else {
      logger.error('Invalid chat configuration. Please check your chat-config.ts file.');
    }
  }, []);

  // Show loading state while validating config
  if (!configValid || chatType === null) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-muted-foreground">Loading chat...</div>
      </div>
    );
  }

  // Render based on chat type
  switch (chatType) {
    case 'widget':
      return <ChatWidget />;
    case 'interface':
      return <ChatWindow />;
    default:
      return (
        <div className="flex items-center justify-center min-h-[200px] text-destructive">
          <div>
            <h3 className="font-semibold mb-2">Invalid Chat Type</h3>
            <p className="text-sm">
              Please check your chat configuration in <code>lib/chat-config.ts</code>
            </p>
          </div>
        </div>
      );
  }
}

/**
 * Chat Type Specific Components
 * 
 * These components allow you to force a specific chat type
 * regardless of the global configuration.
 */

export function WidgetChat() {
  return <ChatWidget />;
}

export function InterfaceChat() {
  return <ChatWindow />;
} 