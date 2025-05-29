import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

interface CommentModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  tokenSymbol: string;
  tokenImage: string;
}

export const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onOpenChange, tokenSymbol, tokenImage }) => {
  const [comment, setComment] = React.useState("");
  
  const handleSubmit = () => {
    if (comment.trim()) {
      // In a real app, this would submit the comment to an API
      console.log(`Comment on ${tokenSymbol}: ${comment}`);
      setComment("");
      onOpenChange(false);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Comment on {tokenSymbol}
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-2">
                <Avatar
                  src={tokenImage}
                  className="w-8 h-8"
                  radius="sm"
                />
                <Textarea
                  placeholder={`What are your thoughts on ${tokenSymbol}?`}
                  value={comment}
                  onValueChange={setComment}
                  className="w-full"
                  minRows={3}
                  maxRows={6}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit} isDisabled={!comment.trim()}>
                Post Comment
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};