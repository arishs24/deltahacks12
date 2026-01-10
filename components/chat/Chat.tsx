"use client";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fetchAnswer } from "../../lib/answer";
import { getCommonConfig } from "../../lib/chat-config";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const commonConfig = getCommonConfig();

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", content: input }]);
    setLoading(true);
    setError(null);
    try {
      // Use the new API configuration system
      const data = await fetchAnswer({
        query: input,
        chatHistory: messages.map((m) => ({ role: m.role, content: m.content })),
        // Fallback parameters for backward compatibility
        namespace: commonConfig.api.namespace,
        top_k: commonConfig.api.topK,
        aiModel: commonConfig.api.model,
        temperature: commonConfig.api.temperature,
        threshold: commonConfig.api.threshold,
      });
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: data.answer || data.response || "(No response)" },
      ]);
      setInput("");
      inputRef.current?.focus();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  return (
    <Card className="max-w-lg w-full mx-auto mt-8 bg-card text-card-foreground border-radius-lg shadow-lg">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto bg-background">
          {messages.length === 0 && (
            <div className="text-muted-foreground bg-background text-center py-8">
              {commonConfig.branding.subtitle || "Start the conversation!"}
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <Avatar className="h-8 w-8"><AvatarFallback>AI</AvatarFallback></Avatar>
              )}
              <div className={`rounded-lg px-3 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <Avatar className="h-8 w-8"><AvatarFallback>U</AvatarFallback></Avatar>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-2 items-center text-muted-foreground text-sm"><span className="animate-pulse">AI is typing...</span></div>
          )}
        </div>
        <div className="flex gap-2 pt-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1"
            autoFocus
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            Send
          </Button>
        </div>
        {error && <div className="text-destructive text-xs text-center">{error}</div>}
      </CardContent>
    </Card>
  );
} 