import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

interface CommentModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  tokenSymbol: string;
  tokenImage: string;
  userName?: string;
}

export const CommentModal: React.FC<CommentModalProps> = ({ 
  isOpen, 
  onOpenChange, 
  tokenSymbol, 
  tokenImage,
  userName = "Anonymous"
}) => {
  const [comment, setComment] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = () => {
    if (comment.trim()) {
      // In a real app, this would submit the comment to an API
      console.log(`Comment on ${tokenSymbol}: ${comment}`);
      setComment("");
      onOpenChange(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);
  
  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="md"
      classNames={{
        base: "max-w-[600px]",
        closeButton: "hidden",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center h-14 border-b border-neutral-200 dark:border-neutral-800">
              <Button
                isIconOnly
                variant="light"
                onPress={onClose}
                className="absolute left-2 rounded-full w-9 h-9 text-foreground"
              >
                <Icon icon="lucide:x" width={20} />
              </Button>
            </ModalHeader>
            <ModalBody className="p-0">
              <div className="flex gap-3 p-4">
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    src={tokenImage}
                    className="w-10 h-10"
                    radius="full"
                  />
                  <div className="w-0.5 flex-1 bg-neutral-200 dark:bg-neutral-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-semibold text-[15px]">{tokenSymbol}</span>
                    <Icon 
                      icon="lucide:badge-check" 
                      width={16} 
                      className="text-[#1d9bf0]" 
                    />
                  </div>
                  <div className="text-neutral-500 text-[15px] mb-3">
                    Replying to <span className="text-[#1d9bf0]">@{tokenSymbol}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 px-4 pb-4">
                <Avatar
                  src="https://avatars.githubusercontent.com/u/1234567?v=4"
                  className="w-10 h-10"
                  radius="full"
                />
                <div className="flex-1">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Post your reply"
                    value={comment}
                    onValueChange={setComment}
                    classNames={{
                      base: "w-full",
                      input: "text-[17px] min-h-[120px] p-0 border-none bg-transparent focus:ring-0 placeholder:text-neutral-500",
                    }}
                    minRows={4}
                    maxRows={12}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="border-t border-neutral-200 dark:border-neutral-800">
              <Button 
                className="bg-[#1d9bf0] text-white font-semibold hover:bg-[#1a8cd8] rounded-full px-5"
                size="lg"
                onPress={handleSubmit} 
                isDisabled={!comment.trim()}
              >
                Reply
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};