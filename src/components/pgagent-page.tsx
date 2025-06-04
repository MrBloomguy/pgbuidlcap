import React, { useState, useRef, useEffect } from "react";
import { Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Message {
  id: number;
  sender: "user" | "agent";
  content: string;
  timestamp: string;
}

export const PGAgentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "agent",
      content: "👋 Hi! I'm Buidl AI, your public goods development assistant. I can help you with:\n\n• Finding relevant grant programs\n• Reviewing your project proposals\n• Suggesting public goods opportunities\n• Connecting with other builders\n\nHow can I assist you today?",
      timestamp: new Date().toISOString()
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: messages.length + 2,
        sender: "agent",
        content: "Let me help you with that! I'm analyzing your request...",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Add a class to body to hide mobile nav
    document.body.classList.add("hide-mobile-nav");
    return () => {
      document.body.classList.remove("hide-mobile-nav");
    };
  }, []);

  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center dark:bg-[#343541] bg-white">
      {/* Main Chat Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl flex flex-col flex-1">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto pt-8 pb-4 sm:pt-8 sm:pb-4 pt-2 pb-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} px-2 sm:px-4 mb-2`}
              >
                <div className={`flex gap-3 max-w-[90vw] sm:max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon 
                      icon={message.sender === "agent" ? "lucide:sparkles" : "lucide:user"} 
                      className="text-primary"
                      width={18} 
                    />
                  </div>
                  <div className={`rounded-xl px-4 py-3 text-sm whitespace-pre-line ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-content1 text-foreground"}`}>
                    {message.content}
                    <div className="mt-1 text-xs text-default-400 text-right">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start px-2 sm:px-4 mb-2">
                <div className="flex gap-3 max-w-[90vw] sm:max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon icon="lucide:sparkles" className="text-primary" width={18} />
                  </div>
                  <div className="rounded-xl px-4 py-3 bg-content1 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Input Area */}
          <div className="w-full px-2 sm:px-4 pb-4 sm:pb-8">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Buidl AI..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                size="sm"
                classNames={{
                  input: "pr-24",
                  innerWrapper: "pr-20"
                }}
                endContent={
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={handleSend}
                      isDisabled={!input.trim()}
                    >
                      <Icon icon="lucide:send" className="text-primary" width={16} />
                    </Button>
                  </div>
                }
              />
            </div>
            <div className="mt-2 text-center">
              <span className="text-tiny text-default-400">
                Buidl AI can make mistakes. Consider verifying important information.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
