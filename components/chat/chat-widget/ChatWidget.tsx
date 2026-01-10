'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { fetchAnswer } from '../../../lib/answer';
import { getWidgetConfig, getCommonConfig } from '../../../lib/chat-config';
import { cn } from '../../../lib/utils';
import { useIsMobile } from '../../../hooks/use-mobile';
import Image from 'next/image';

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const widgetConfig = getWidgetConfig();
  const commonConfig = getCommonConfig();
  const isMobile = useIsMobile();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Auto-focus input when chat opens (desktop only)
  useEffect(() => {
    if (isOpen && !isMinimized && !isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized, isMobile]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Use the new API configuration system
      const data = await fetchAnswer({
        query: userMessage.content,
        chatHistory: messages.map((m) => ({ role: m.role, content: m.content })),
        // Fallback parameters for backward compatibility
        namespace: commonConfig.api.namespace,
        top_k: commonConfig.api.topK,
        aiModel: commonConfig.api.model,
        temperature: commonConfig.api.temperature,
        threshold: commonConfig.api.threshold,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer || data.response || "(No response)",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (isMobile) {
        // On mobile, Enter creates new line
        return;
      } else {
        // On desktop, Enter sends (unless Shift+Enter)
        if (!e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      }
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
  };

  // Widget positioning classes
  const getPositionClasses = () => {
    return 'relative';
  };

  // Size classes based on config and mobile
  const getSizeClasses = () => {
    if (isMobile) {
      return 'w-12 h-12 sm:w-14 sm:h-14';
    }
    
    const { size } = widgetConfig;
    switch (size) {
      case 'small':
        return 'w-12 h-12';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-14 h-14';
    }
  };

  const getChatSizeClasses = () => {
    if (isMobile) {
      // On mobile, make chat fullscreen-like
      return 'w-[95vw] h-[85vh] max-w-sm';
    }
    
    const { size } = widgetConfig;
    switch (size) {
      case 'small':
        return 'w-80 h-96';
      case 'large':
        return 'w-96 h-[32rem]';
      default:
        return 'w-88 h-[28rem]';
    }
  };

  const getChatPositionClasses = () => {
    if (isMobile) {
      // Center on mobile
      return 'fixed inset-4 z-50';
    }
    return 'absolute bottom-16 right-0';
  };

  return (
    <div className={getPositionClasses()}>
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={cn(
            'transition-all duration-300 ease-in-out',
            getChatPositionClasses(),
            isMinimized ? 'scale-95 opacity-75' : 'scale-100 opacity-100',
            !isMobile && getChatSizeClasses()
          )}
          style={isMobile ? {} : undefined}
        >
          <Card className="h-full flex flex-col shadow-lg border-border">
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between p-3 pb-2 border-b bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Image
                  src={commonConfig.branding.logo || '/assets/logo.png'}
                  alt={commonConfig.branding.title || 'Logo'}
                  width={24}
                  height={24}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-contain flex-shrink-0 bg-primary-foreground/10"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 hidden">
                  <Bot size={isMobile ? 12 : 16} className="text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-sm font-semibold truncate">
                    {commonConfig.branding.title}
                  </CardTitle>
                  {commonConfig.branding.subtitle && !isMobile && (
                    <p className="text-xs opacity-80 truncate">
                      {commonConfig.branding.subtitle}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!isMobile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-primary-foreground/20 text-primary-foreground"
                    onClick={isMinimized ? maximizeChat : minimizeChat}
                  >
                    {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-primary-foreground/20 text-primary-foreground touch-manipulation"
                  onClick={toggleChat}
                >
                  <X size={12} />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            {!isMinimized && (
              <>
                <CardContent className="flex-1 overflow-y-auto p-3 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-4 sm:py-8">
                      <Image
                        src={commonConfig.branding.logo || '/assets/logo.png'}
                        alt={commonConfig.branding.title || 'Logo'}
                        width={40}
                        height={40}
                        className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 opacity-50 rounded-full object-contain bg-primary/10"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                          (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden">
                        <Bot size={isMobile ? 24 : 32} className="mx-auto mb-2 opacity-50" />
                      </div>
                      <p className="text-xs sm:text-sm">
                        {commonConfig.branding.subtitle || "Hi! How can I help you today?"}
                      </p>
                    </div>
                  )}
                  
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex gap-2 items-start',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {message.role === 'assistant' && !isMobile && (
                        <Image
                          src={commonConfig.branding.logo || '/assets/logo.png'}
                          alt={commonConfig.branding.title || 'Logo'}
                          width={24}
                          height={24}
                          className="h-6 w-6 mt-1 rounded-full object-contain bg-primary/10"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                            (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      )}
                      {message.role === 'assistant' && !isMobile && (
                        <div className="hidden">
                          <Avatar className="h-6 w-6 mt-1">
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                              AI
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      
                      <div
                        className={cn(
                          'max-w-[85%] px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm break-words',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-muted text-foreground rounded-bl-sm'
                        )}
                      >
                        {/* Mobile AI indicator */}
                        {message.role === 'assistant' && isMobile && (
                          <div className="flex items-center gap-1 mb-1 opacity-75">
                            <Image
                              src={commonConfig.branding.logo || '/assets/logo.png'}
                              alt={commonConfig.branding.title || 'Logo'}
                              width={16}
                              height={16}
                              className="w-4 h-4 rounded-full object-contain bg-primary/10"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                                (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden">
                              <Bot size={10} className="text-primary" />
                            </div>
                          </div>
                        )}
                        
                        <div className="leading-relaxed">{message.content}</div>
                        <div
                          className={cn(
                            'text-xs mt-1 opacity-70 flex items-center justify-between',
                            message.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                          )}
                        >
                          <span>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          {/* Mobile user indicator - removed */}
                        </div>
                      </div>
                      
                      {message.role === 'user' && (
                        <Avatar className="h-6 w-6 mt-1">
                          <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                            U
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      {!isMobile && (
                        <Image
                          src={commonConfig.branding.logo || '/assets/logo.png'}
                          alt={commonConfig.branding.title || 'Logo'}
                          width={24}
                          height={24}
                          className="h-6 w-6 mt-1 mr-2 rounded-full object-contain bg-primary/10"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                            (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      )}
                      {!isMobile && (
                        <div className="hidden">
                          <Avatar className="h-6 w-6 mt-1 mr-2">
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                              AI
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      <div className="max-w-[85%] px-2.5 sm:px-3 py-2 rounded-lg bg-muted rounded-bl-sm">
                        {isMobile && (
                          <div className="flex items-center gap-1 mb-1 opacity-75">
                            <Image
                              src={commonConfig.branding.logo || '/assets/logo.png'}
                              alt={commonConfig.branding.title || 'Logo'}
                              width={16}
                              height={16}
                              className="w-4 h-4 rounded-full object-contain bg-primary/10"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                                (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden">
                              <Bot size={10} className="text-primary" />
                            </div>
                          </div>
                        )}
                        <div className="flex space-x-1 items-center h-4">
                          <div className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {error && (
                    <div className="text-destructive text-xs text-center p-2 bg-destructive/10 rounded">
                      {error}
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input Area */}
                <div className="p-3 border-t bg-card">
                  <div className="flex items-end gap-2">
                    <Textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={isMobile ? "Type a message..." : "Type your message..."}
                      disabled={isLoading}
                      rows={1}
                      className={cn(
                        "flex-1 min-h-[32px] sm:min-h-[36px] max-h-20 sm:max-h-24 py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm resize-none touch-manipulation",
                        isMobile && "text-base" // Prevent zoom on iOS
                      )}
                      style={{
                        height: 'auto',
                        overflow: input.split('\n').length > 1 || input.length > (isMobile ? 25 : 30) ? 'auto' : 'hidden'
                      }}
                      onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${Math.min(target.scrollHeight, isMobile ? 80 : 96)}px`;
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="sentences"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      size="sm"
                      className={cn(
                        "flex-shrink-0 self-end touch-manipulation",
                        isMobile ? "px-3 h-[32px]" : "px-3"
                      )}
                    >
                      <Send size={isMobile ? 12 : 14} />
                      {isMobile && <span className="ml-1 text-xs">Send</span>}
                    </Button>
                  </div>
                  
                  {/* Mobile helper text */}
                  {isMobile && (
                    <div className="text-xs text-muted-foreground mt-1 text-center">
                      Tap Send to send your message
                    </div>
                  )}
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90 text-primary-foreground touch-manipulation",
          getSizeClasses()
        )}
        size="icon"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X size={isMobile ? 20 : 24} />
        ) : (
          <Image
            src={commonConfig.branding.logo || '/assets/logo.png'}
            alt={commonConfig.branding.title || 'Logo'}
            width={56}
            height={56}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
        )}
        {isOpen ? null : (
          <MessageCircle size={isMobile ? 20 : 24} className="hidden" />
        )}
      </Button>
    </div>
  );
} 