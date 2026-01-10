'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export default function MessageInput({ onSend, isLoading = false }: MessageInputProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text.trim());
      setText('');
      // Reset textarea height
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isMobile) {
        // On mobile, Enter creates new line, need explicit send button
        return;
      } else {
        // On desktop, Enter sends (unless Shift+Enter)
        if (!e.shiftKey) {
          e.preventDefault();
          handleSubmit(e);
        }
      }
    }
  };

  // Auto-focus on desktop, but not on mobile to prevent keyboard pop-up
  useEffect(() => {
    if (!isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobile]);

  // Auto-resize textarea
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    const maxHeight = isMobile ? 80 : 96; // Smaller max height for compact design
    target.style.height = `${Math.min(target.scrollHeight, maxHeight)}px`;
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <Textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isMobile 
              ? "Type your message..." 
              : "Type your message... (Press Enter to send, Shift+Enter for new line)"
          }
          disabled={isLoading}
          rows={1}
          className={`flex-1 min-h-[36px] sm:min-h-[40px] max-h-[80px] sm:max-h-24 py-2 sm:py-2.5 px-3 sm:px-4 bg-background border-border rounded-lg text-sm sm:text-base text-foreground placeholder:text-muted-foreground resize-none touch-manipulation ${
            isMobile ? 'text-base' : '' // Prevent zoom on iOS
          }`}
          style={{
            height: 'auto',
            overflow: text.split('\n').length > 1 || text.length > (isMobile ? 30 : 50) ? 'auto' : 'hidden'
          }}
          onInput={handleInput}
          // Prevent zoom on iOS
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="sentences"
          spellCheck="true"
        />
        <Button
          type="submit"
          size="default"
          disabled={isLoading || !text.trim()}
          
          className={`${
            isMobile
              ? 'px-4 h-[36px] min-w-[60px]'
              : 'px-3 h-[40px] min-w-[60px]'
          } flex-shrink-0 self-end touch-manipulation text-sm font-medium`}
        >
          Send
        </Button>
      </form>
      
      {/* Helper text for all devices */}
      <div className="text-xs text-muted-foreground mt-1 px-1">
        {isMobile ? "Tap Send to send your message" : "Press Enter to send"}
      </div>
    </div>
  );
} 