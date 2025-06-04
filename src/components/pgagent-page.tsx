import React, { useState } from "react";
import { Card, CardBody, Input, Button, Badge, Divider } from "@heroui/react";
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "agent",
      content: "👋 Hi! I'm Buidl AI, your public goods development assistant. I can help you with:\n\n• Finding relevant grant programs\n• Reviewing your project proposals\n• Suggesting public goods opportunities\n• Connecting with other builders\n\nHow can I assist you today?",
      timestamp: new Date().toISOString()
    }
  ]);

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

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-4rem)] flex">
      <div className="flex flex-1 gap-6">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardBody className="flex-1 flex flex-col p-0">
              {/* Header */}
              <div className="p-4 border-b border-divider">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon icon="lucide:sparkles" className="text-primary" width={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Buidl AI</h3>
                    <div className="flex items-center gap-2">
                      <Badge color="success" variant="flat" size="sm">Active</Badge>
                      <span className="text-default-400 text-xs">Response time: &lt; 1min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        message.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-default-100"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <span className="text-xs mt-1 opacity-70 block">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-default-100 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-divider">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about public goods development..."
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    size="sm"
                    endContent={
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={handleSend}
                        isDisabled={!input.trim()}
                      >
                        <Icon icon="lucide:send" className="text-primary" width={16} />
                      </Button>
                    }
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="hidden md:flex flex-col gap-4 w-80">
          {/* Capabilities */}
          <Card>
            <CardBody className="p-4">
              <h3 className="font-semibold text-sm mb-3">AI Capabilities</h3>
              <div className="space-y-3">
                <div className="flex gap-2 items-center">
                  <Icon icon="lucide:search" className="text-primary shrink-0" width={16} />
                  <span className="text-default-500 text-sm">Grant Program Discovery</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon icon="lucide:edit" className="text-primary shrink-0" width={16} />
                  <span className="text-default-500 text-sm">Proposal Review & Feedback</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon icon="lucide:lightbulb" className="text-primary shrink-0" width={16} />
                  <span className="text-default-500 text-sm">Project Ideation</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon icon="lucide:users" className="text-primary shrink-0" width={16} />
                  <span className="text-default-500 text-sm">Builder Network Access</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardBody className="p-4">
              <h3 className="font-semibold text-sm mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start"
                  variant="flat"
                  size="sm"
                  startContent={<Icon icon="lucide:compass" width={16} />}
                >
                  Browse Grant Programs
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="flat"
                  size="sm"
                  startContent={<Icon icon="lucide:file-text" width={16} />}
                >
                  Create New Proposal
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="flat"
                  size="sm"
                  startContent={<Icon icon="lucide:users" width={16} />}
                >
                  Find Collaborators
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="flat"
                  size="sm"
                  startContent={<Icon icon="lucide:book-open" width={16} />}
                >
                  View Resources
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
