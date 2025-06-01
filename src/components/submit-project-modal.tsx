import React, { useState } from 'react';
import { Modal, ModalContent, Button, RadioGroup, Radio, Input, Textarea, Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProjectSource = 'api' | 'third-party' | 'self';

export const SubmitProjectModal: React.FC<SubmitProjectModalProps> = ({ isOpen, onClose }) => {
  const [projectSource, setProjectSource] = useState<ProjectSource>('self');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
  });

  const handleSubmit = () => {
    // TODO: Implement project submission logic
    console.log('Submitting project:', { projectSource, ...formData });
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Submit Project</h2>
            <Button
              isIconOnly
              variant="light"
              onPress={onClose}
            >
              <Icon icon="lucide:x" width={20} />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Project Source Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">How would you like to submit your project?</label>
              <RadioGroup
                value={projectSource}
                onValueChange={setProjectSource as any}
                orientation="horizontal"
                className="gap-4"
              >
                <Radio value="api">
                  <div className="flex flex-col">
                    <span className="font-medium">API Import</span>
                    <span className="text-xs text-default-400">Import from connected platforms</span>
                  </div>
                </Radio>
                <Radio value="third-party">
                  <div className="flex flex-col">
                    <span className="font-medium">Third Party</span>
                    <span className="text-xs text-default-400">Submit existing project</span>
                  </div>
                </Radio>
                <Radio value="self">
                  <div className="flex flex-col">
                    <span className="font-medium">Create New</span>
                    <span className="text-xs text-default-400">Submit your own project</span>
                  </div>
                </Radio>
              </RadioGroup>
            </div>

            <Divider />

            {/* Project Details Form */}
            {projectSource === 'api' && (
              <Card>
                <CardBody>
                  <div className="flex items-center gap-4">
                    <Icon icon="lucide:database" className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Connect to Platform API</h3>
                      <p className="text-sm text-default-400">Import your projects directly from supported platforms</p>
                    </div>
                    <Button
                      color="primary"
                      className="ml-auto"
                      endContent={<Icon icon="lucide:arrow-right" />}
                    >
                      Connect
                    </Button>
                  </div>
                </CardBody>
              </Card>
            )}

            {projectSource === 'third-party' && (
              <div className="space-y-4">
                <Input
                  label="Project URL"
                  placeholder="https://github.com/username/project"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
                <Input
                  label="Project Name"
                  placeholder="Enter project name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Textarea
                  label="Description"
                  placeholder="Brief description of the project"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            )}

            {projectSource === 'self' && (
              <div className="space-y-4">
                <Input
                  label="Project Name"
                  placeholder="Enter project name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Textarea
                  label="Description"
                  placeholder="Describe your project"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <Input
                  label="Category"
                  placeholder="e.g., DeFi, NFT, Infrastructure"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="flat"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                endContent={<Icon icon="lucide:send" width={16} />}
              >
                Submit Project
              </Button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
