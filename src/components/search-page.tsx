import React, { useState } from "react";
import { Card, CardBody, Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Message {
  id: number;
  sender: "user" | "agent";
  text: string;
}

export const PGAgentPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "user",
        text: input.trim(),
      };
      setMessages([...messages, newMessage]);
      setInput("");

      // Simulate agent response
      setTimeout(() => {
        const agentMessage: Message = {
          id: messages.length + 2,
          sender: "agent",
          text: "This is a simulated response from PGAgent.",
        };
        setMessages((prev) => [...prev, agentMessage]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <Card key={message.id} className={`mb-2 ${message.sender === "agent" ? "bg-gray-100" : "bg-blue-100"}`}>
            <CardBody>
              <p className="text-sm font-medium">{message.sender === "agent" ? "PGAgent" : "You"}</p>
              <p className="text-sm mt-1">{message.text}</p>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="p-4 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full mb-2"
        />
        <Button onClick={handleSendMessage} className="w-full" variant="solid">
          Send
        </Button>
      </div>
    </div>
  );
};
