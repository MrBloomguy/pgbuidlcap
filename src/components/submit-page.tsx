import React, { useState } from 'react';
import { Card, CardBody, Button, RadioGroup, Radio, Input, Textarea, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

type ProjectSource = 'api' | 'third-party' | 'self';

interface ProjectFormData {
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
}

export const SubmitPage: React.FC = () => {
  const [projectSource, setProjectSource] = useState<ProjectSource>('self');
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    url: '',
    category: '',
    tags: []
  });

  const handleSubmit = () => {
    // TODO: Implement project submission logic
    console.log('Submitting project:', { projectSource, ...formData });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Submit Project</h1>
          <p className="text-default-500">Share your project with the community</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="md:col-span-2 space-y-6">
          {/* Project Source Selection */}
          <Card>
            <CardBody className="space-y-4">
              <h2 className="text-lg font-semibold">Project Source</h2>
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
            </CardBody>
          </Card>

          {/* Project Details Form */}
          <Card>
            <CardBody className="space-y-6">
              <h2 className="text-lg font-semibold">Project Details</h2>

              {projectSource === 'api' && (
                <div>
                  <div className="flex items-center gap-4 p-4 bg-default-50 rounded-xl">
                    <Icon icon="lucide:database" className="w-8 h-8 text-primary" />
                    <div className="flex-1">
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
                </div>
              )}

              {projectSource === 'third-party' && (
                <div className="space-y-4">
                  <Input
                    label="Project URL"
                    placeholder="https://github.com/username/project"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    startContent={<Icon icon="lucide:link" className="text-default-400" />}
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
                    minRows={4}
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
                    placeholder="Describe your project in detail"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    minRows={6}
                  />
                  <Input
                    label="Category"
                    placeholder="e.g., DeFi, NFT, Infrastructure"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                  <Input
                    label="Project URL (Optional)"
                    placeholder="https://your-project.com"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    startContent={<Icon icon="lucide:link" className="text-default-400" />}
                  />
                </div>
              )}
            </CardBody>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button
              variant="flat"
              size="lg"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              size="lg"
              onPress={handleSubmit}
              endContent={<Icon icon="lucide:send" width={16} />}
            >
              Submit Project
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Guidelines */}
          <Card>
            <CardBody>
              <h3 className="font-semibold mb-3">Submission Guidelines</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Icon icon="lucide:check-circle" className="text-success shrink-0" />
                  <p className="text-sm">Project must be open source or have public documentation</p>
                </div>
                <div className="flex gap-2">
                  <Icon icon="lucide:check-circle" className="text-success shrink-0" />
                  <p className="text-sm">Clear description of project's purpose and functionality</p>
                </div>
                <div className="flex gap-2">
                  <Icon icon="lucide:check-circle" className="text-success shrink-0" />
                  <p className="text-sm">Up-to-date and maintained codebase</p>
                </div>
                <div className="flex gap-2">
                  <Icon icon="lucide:check-circle" className="text-success shrink-0" />
                  <p className="text-sm">Follows community guidelines and best practices</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Help Card */}
          <Card>
            <CardBody>
              <h3 className="font-semibold mb-3">Need Help?</h3>
              <p className="text-sm text-default-500 mb-4">
                Have questions about submitting your project? Check our documentation or reach out to the community.
              </p>
              <div className="space-y-2">
                <Button
                  variant="flat"
                  className="w-full justify-start"
                  startContent={<Icon icon="lucide:book-open" />}
                >
                  Read Documentation
                </Button>
                <Button
                  variant="flat"
                  className="w-full justify-start"
                  startContent={<Icon icon="lucide:message-circle" />}
                >
                  Join Discord
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
