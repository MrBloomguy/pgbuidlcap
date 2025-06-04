import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

interface RepostModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  tokenSymbol: string;
  tokenImage: string;
  tokenDescription?: string;
}

export const RepostModal: React.FC<RepostModalProps> = ({ 
  isOpen, 
  onOpenChange, 
  tokenSymbol, 
  tokenImage,
  tokenDescription = "Token information and market data would appear here."
}) => {
  const [comment, setComment] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = () => {
    // In a real app, this would submit the repost to an API
    console.log(`Reposted ${tokenSymbol} with comment: ${comment}`);
    setComment("");
    onOpenChange(false);
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
                <Avatar
                  src="https://avatars.githubusercontent.com/u/1234567?v=4"
                  className="w-10 h-10"
                  radius="full"
                />
                <div className="flex-1">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Add a comment"
                    value={comment}
                    onValueChange={setComment}
                    classNames={{
                      base: "w-full",
                      input: "text-[17px] min-h-[120px] p-0 border-none bg-transparent focus:ring-0 placeholder:text-neutral-500",
                    }}
                    minRows={4}
                    maxRows={8}
                  />
                  <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl mt-3 hover:bg-default-100/50 transition-colors">
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar
                          src={tokenImage}
                          className="w-5 h-5"
                          radius="full"
                        />
                        <div className="flex items-center gap-1 min-w-0">
                          <span className="font-semibold text-[15px] truncate">{tokenSymbol}</span>
                          <Icon 
                            icon="lucide:badge-check" 
                            width={16} 
                            className="text-[#1d9bf0] shrink-0" 
                          />
                        </div>
                      </div>
                      <p className="text-[15px] text-neutral-500 line-clamp-3">
                        {tokenDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="border-t border-neutral-200 dark:border-neutral-800">
              <Button 
                className="bg-[#1d9bf0] text-white font-semibold hover:bg-[#1a8cd8] rounded-full px-5"
                size="lg"
                onPress={handleSubmit}
              >
                Repost
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};