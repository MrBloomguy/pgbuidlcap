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
  // State to manage the view: initial welcome screen or chat history
  const [chatStarted, setChatStarted] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // If chat hasn't started, set it to true on first message send
    if (!chatStarted) {
      setChatStarted(true);
    }

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
    // This part is kept as it might be specific to the original app's global styling.
    document.body.classList.add("hide-mobile-nav");
    return () => {
      document.body.classList.remove("hide-mobile-nav");
    };
  }, []);

  return (
    // The main container ensures full viewport height.
    // No explicit background color here, so it inherits from parent.
    <div className="min-h-screen flex flex-col items-center justify-center font-sans">
      {/* Main Content Area - dynamically renders based on chatStarted state */}
      {/* Removed `bg-gray-50` from here to allow parent's background to show through. */}
      {/* If the original image had a subtle grey for the main content area, that effect will be lost. */}
      {/* If you want a *different* background than the parent, you'd add a non-white color here. */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 w-full overflow-hidden">
        {!chatStarted ? (
          /* Initial Welcome Screen UI */
          <div className="flex flex-col items-center justify-center h-full w-full max-w-3xl text-center px-4">
            {/* Large Purple Icon */}
            <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg">
              <Icon icon="lucide:sparkles" width={24} height={24} className="text-white" />
            </div>
            {/* Greeting */}
            <p className="text-lg text-gray-600 mt-8">Hello, Builder! 👋 </p>
            {/* Main Question */}
            <h1 className="text-2xl font-bold text-white-900 mt-2">
              Find out about public goods.
            </h1>

            {/* Specialized Input Field for Initial State */}
            {/* This input bar still has `bg-white` and `border` */}
            <div className="w-full relative max-w-xl mx-auto mt-12 flex items-center bg-white rounded-xl shadow-md border border-gray-200 p-2">
              {/* Input component without default borders/shadows */}
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border-none focus:ring-0 text-base"
                classNames={{
                  inputWrapper: "shadow-none bg-transparent h-auto p-0", // Remove default Heroui Input styling
                  input: "placeholder:text-gray-400 text-base"
                }}
              />
              {/* Action Buttons within the input bar */}
              <div className="flex items-center gap-1">
                
                {/* Send Button */}
                <Button
                  isIconOnly
                  size="md"
                  color="primary" // Assuming 'primary' maps to a purple in Heroui themes
                  onPress={handleSend}
                  isDisabled={!input.trim()}
                  className="bg-#CDEB63-600 text-white rounded-lg w-8 h-8 flex-shrink-0"
                >
                  <Icon icon="lucide:arrow-up" className="text-white" width={16} />
                </Button>
              </div>
            </div>
           
          </div>
        ) : (
          /* Chat History and Chat Input (once chat has started) */
          <div className="flex-1 w-full max-w-2xl flex flex-col h-full">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto pt-8 pb-4 sm:pt-8 sm:pb-4 pt-2 pb-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} px-2 sm:px-4 mb-2`}
                >
                  <div className={`flex gap-3 max-w-[90vw] sm:max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                    {/* Avatar/Icon for sender */}
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                      <Icon
                        icon={message.sender === "agent" ? "lucide:sparkles" : "lucide:user"}
                        width={18}
                      />
                    </div>
                    {/* Message Bubble */}
                    {/* Agent message bubble remains `bg-white` as seen in design */}
                    <div className={`rounded-xl px-4 py-3 text-sm whitespace-pre-line shadow-sm ${message.sender === "user" ? "bg-purple-600 text-white" : "bg-white text-gray-900"}`}>
                      {message.content}
                      {/* Timestamp */}
                      <div className="mt-1 text-xs text-gray-400 text-right">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Loading/Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start px-2 sm:px-4 mb-2">
                  <div className="flex gap-3 max-w-[90vw] sm:max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Icon icon="lucide:sparkles" className="text-purple-600" width={18} />
                    </div>
                    {/* Typing indicator bubble remains `bg-white` */}
                    <div className="rounded-xl px-4 py-3 bg-white flex items-center gap-2 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area for Chat State */}
            {/* Removed `bg-gray-50` from here, as the intention is to inherit parent background */}
            <div className="w-full px-2 sm:px-4 pb-4 sm:pb-8 flex justify-center sticky bottom-0 pt-2">
              <div className="relative w-full max-w-xl">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Buidl AI..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  size="lg" // Larger input for better usability in chat context
                  classNames={{
                    inputWrapper: "pr-12 shadow-md bg-white border border-gray-200 rounded-xl",
                    input: "text-base",
                    innerWrapper: "pr-10" // Adjust inner wrapper to make space for send button
                  }}
                  endContent={
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Button
                        isIconOnly
                        size="md"
                        color="primary"
                        onPress={handleSend}
                        isDisabled={!input.trim()}
                        className="bg-purple-600 text-white rounded-lg w-8 h-8 flex items-center justify-center"
                      >
                        <Icon icon="lucide:arrow-up" className="text-white" width={16} />
                      </Button>
                    </div>
                  }
                />
              </div>
            </div>
            {/* Disclaimer for Chat State */}
            <div className="mt-2 text-center text-sm text-gray-500 pb-4">
              Buidl AI can make mistakes. Consider verifying important information.
            </div>
          </div>
        )}
      </main>
    </div>
  );
};