import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

interface UpvoteModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  tokenSymbol: string;
  tokenImage: string;
}

export const UpvoteModal: React.FC<UpvoteModalProps> = ({ isOpen, onOpenChange, tokenSymbol, tokenImage }) => {
  const [comment, setComment] = React.useState("");
  
  const handleSubmit = () => {
    // In a real app, this would submit the upvote to an API
    console.log(`Upvoted ${tokenSymbol} with comment: ${comment}`);
    setComment("");
    onOpenChange(false);
  };
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Upvote {tokenSymbol}
            </ModalHeader>
            <ModalBody>
              <div className="border border-divider rounded-md p-3 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar
                    src={tokenImage}
                    className="w-6 h-6"
                    radius="sm"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{tokenSymbol}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-default-500">
                  Supporting this project shows your interest in its success.
                </p>
              </div>
              
              <Textarea
                placeholder="Add a comment with your upvote (optional)"
                value={comment}
                onValueChange={setComment}
                className="w-full"
                minRows={2}
                maxRows={4}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Upvote
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
