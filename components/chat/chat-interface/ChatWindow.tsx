'use client';

import { Button } from '@/components/ui/button';
import { BookOpen, WifiOff, MessageSquare, Clock, PlusCircle, Trash, Menu, X } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import useChat from '@/hooks/useChat';
import { formatDistanceToNow } from 'date-fns';
import { getInterfaceConfig, getCommonConfig } from "@/lib/chat-config";
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';

export default function ChatWindow() {
  const { 
    messages, 
    sendMessage, 
    startNewChat, 
    deleteChat,
    switchChat,
    isLoading, 
    isOnline,
    activeChat,
    chatHistories
  } = useChat();

  const interfaceConfig = getInterfaceConfig();
  const commonConfig = getCommonConfig();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  const handleSwitchChat = (chatId: string) => {
    switchChat(chatId);
    // Close sidebar on mobile after selecting a chat
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const getLayoutClasses = () => {
    const { layout, maxWidth } = interfaceConfig;
    
    if (isMobile) {
      // On mobile, chat takes full screen regardless of layout
      return 'h-[calc(100vh-4rem)] w-full flex flex-col gap-0 p-0';
    }
    
    switch (layout) {
      case 'centered':
        return `max-w-[${maxWidth}] mx-auto h-[calc(100vh-8rem)] flex flex-col gap-4 p-4`;
      case 'fullscreen':
        return 'h-[calc(100vh-6rem)] w-full flex flex-col gap-4 p-4';
      default:
        return 'flex flex-col lg:flex-row h-[calc(100vh-6rem)] w-full gap-4 p-4';
    }
  };

  const showSidebarInLayout = interfaceConfig.showSidebar && interfaceConfig.layout === 'sidebar';

  // Sidebar content component for reuse
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-3 sm:p-4 pb-2 border-b border-border">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-card-foreground">
            <MessageSquare size={16} />
            <h2 className="text-sm sm:text-md font-semibold">Chat History</h2>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 hover:bg-muted" 
              onClick={startNewChat}
              title="Start New Chat"
            >
              <PlusCircle size={16} />
            </Button>
            {/* Close button for mobile sheet */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 hover:bg-muted lg:hidden" 
                onClick={() => setIsSidebarOpen(false)}
                title="Close Sidebar"
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {chatHistories.length > 0 ? (
          <div className="space-y-1.5">
            {chatHistories.map(chat => (
              <div 
                key={chat.id}
                className={`p-2 sm:p-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground flex items-start justify-between group transition-colors touch-manipulation ${
                  activeChat === chat.id ? 'bg-primary/10 border border-primary/20' : ''
                }`}
                onClick={() => handleSwitchChat(chat.id)}
              >
                <div className="overflow-hidden min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-medium truncate text-foreground">
                    {chat.title || 'New Chat'}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock size={10} />
                    <span className="truncate">
                      {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: true })}
                    </span>
                    <span className="hidden sm:inline">• {chat.messages.length} messages</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors touch-manipulation"
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                >
                  <Trash size={12} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground text-sm p-4">
            <MessageSquare size={24} className="opacity-20 mb-2" />
            <p>No conversations yet</p>
            <Button 
              variant="outline" 
              size="sm"
              className="mt-4 touch-manipulation"
              onClick={startNewChat}
            >
              <PlusCircle size={14} className="mr-1" />
              Start a new chat
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={getLayoutClasses()}>
      {/* Desktop Sidebar */}
      {showSidebarInLayout && !isMobile && (
        <aside className="w-80 rounded-xl border border-border bg-card shadow-sm flex flex-col h-full overflow-hidden">
          <SidebarContent />
        </aside>
      )}
      
      {/* Main Chat Area */}
      <main className={`flex-1 ${isMobile ? 'h-full' : 'rounded-xl border border-border bg-card shadow-sm'} overflow-hidden flex flex-col`}>
        {/* Chat Header */}
        <div className={`px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center ${isMobile ? 'bg-background' : ''}`}>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {/* Mobile sidebar trigger */}
            {showSidebarInLayout && isMobile && (
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 lg:hidden mr-1"
                  >
                    <Menu size={16} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="h-full bg-card">
                    <SidebarContent />
                  </div>
                </SheetContent>
              </Sheet>
            )}
            
            <Image
              src={commonConfig.branding.logo || '/assets/logo.png'}
              alt={commonConfig.branding.title || 'Logo'}
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-contain flex-shrink-0 bg-primary/10"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full flex-shrink-0 hidden">
              <BookOpen size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-lg font-semibold text-card-foreground truncate">
                {commonConfig.branding.title}
              </h1>
              {commonConfig.branding.subtitle && interfaceConfig.layout !== 'sidebar' && (
                <p className="text-xs sm:text-sm text-muted-foreground truncate hidden sm:block">
                  {commonConfig.branding.subtitle}
                </p>
              )}

              {!isOnline && (
                <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  <WifiOff size={10} />
                  <span className="hidden sm:inline">Offline Mode - Your messages will be saved</span>
                  <span className="sm:hidden">Offline</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-1 sm:gap-1.5">
            <Button 
              variant="outline" 
              size="sm"
              className="h-7 sm:h-8 text-xs sm:text-sm border-border px-2 sm:px-3 touch-manipulation"
              onClick={startNewChat}
            >
              <PlusCircle size={12} className="mr-1 hidden sm:inline sm:w-[14px] sm:h-[14px]" />
              <span>New</span>
            </Button>
          </div>
        </div>
        
        {/* Messages Area */}
        <div className={`flex-1 overflow-y-auto ${isMobile ? 'px-3 py-2' : 'p-2 sm:p-4'} pb-2 sm:pb-8 mb-1 sm:mb-2`}>
          <MessageList 
            messages={messages} 
            isLoading={isLoading} 
            onSendExample={sendMessage}
          />
        </div>
        
        {/* Input Area */}
        <div className={`${isMobile ? 'p-3 pt-2' : 'p-2 sm:p-4 pt-1 sm:pt-2'} ${isMobile ? 'bg-background' : ''}`}>
          <MessageInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
} 
