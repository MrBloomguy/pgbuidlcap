import React from "react";
import { Card, CardBody, Button, Input, Progress, Badge, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Message {
  id: number;
  sender: "user" | "agent";
  content: string;
  timestamp: string;
}

export const TokenClaimerPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      sender: "agent",
      content: "👋 Welcome to YBLD Token Claimer! I'm here to help you claim your YBLD tokens. Would you like to check your eligibility or start the claim process?",
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
        content: "I can help you with that! First, let me check your eligibility for the YBLD token claim.",
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
                    <Icon icon="lucide:coins" className="text-primary" width={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">YBLD Token Assistant</h3>
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
                      <p className="text-sm">{message.content}</p>
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

              {/* Claim Form */}
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount to Claim</label>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
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
          {/* Token Stats */}
          <Card>
            <CardBody className="p-4">
              <h3 className="font-semibold text-sm mb-3">Token Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-default-500 text-sm">Claimed</span>
                  <span className="font-medium text-sm">5,000 YBLD</span>
                </div>
                <Progress 
                  value={50}
                  size="sm"
                  color="primary"
                  className="h-1"
                />
                <div className="flex justify-between text-xs text-default-400">
                  <span>50% Claimed</span>
                  <span>10,000 Total</span>
                </div>
                <Divider className="my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-default-500 text-sm">Price</span>
                  <span className="font-medium text-sm">$1.20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-default-500 text-sm">Market Cap</span>
                  <span className="font-medium text-sm">$12M</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Claim Rules */}
          <Card>
            <CardBody className="p-6 space-y-4">
              <h3 className="font-semibold">Claim Rules</h3>
              <ul className="space-y-3 text-sm text-default-500">
                <li className="flex items-start gap-2">
                  <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                  <span>Must have participated in YouBuidl beta</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                  <span>Minimum 30 days of active contribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                  <span>Claims are subject to a 6-month vesting period</span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
};
