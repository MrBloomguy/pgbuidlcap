import React from "react";
import { Card, CardBody, CardHeader, Tab, Tabs } from "@heroui/react";
import { Icon } from "@iconify/react";

export const DocsPage = () => {
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {/* Hero Section */}
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-3xl font-bold">YouBuidl Documentation</h1>
        <p className="text-default-600 max-w-2xl mx-auto">
          Learn how to use YouBuidl's features and integrate with our ecosystem
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="hover:border-primary cursor-pointer transition-all">
          <CardBody className="flex items-start gap-3 p-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon icon="lucide:book-open" className="text-primary" width={24} height={24} />
            </div>
            <div>
              <h3 className="font-semibold">Getting Started</h3>
              <p className="text-default-500 text-sm">New to YouBuidl? Start here</p>
            </div>
          </CardBody>
        </Card>
        <Card className="hover:border-primary cursor-pointer transition-all">
          <CardBody className="flex items-start gap-3 p-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon icon="lucide:code" className="text-primary" width={24} height={24} />
            </div>
            <div>
              <h3 className="font-semibold">Developer Guide</h3>
              <p className="text-default-500 text-sm">API references and SDKs</p>
            </div>
          </CardBody>
        </Card>
        <Card className="hover:border-primary cursor-pointer transition-all">
          <CardBody className="flex items-start gap-3 p-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon icon="lucide:help-circle" className="text-primary" width={24} height={24} />
            </div>
            <div>
              <h3 className="font-semibold">FAQs</h3>
              <p className="text-default-500 text-sm">Common questions answered</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="mb-6">
        <CardBody className="p-6">
          <Tabs aria-label="Documentation sections">
            <Tab key="guides" title="Guides">
              <div className="py-4 space-y-6">
                <section className="space-y-4">
                  <h3 className="text-xl font-semibold">Introduction</h3>
                  <p className="text-default-600">
                    YouBuidl is a decentralized social platform that connects builders, creators, and developers
                    in the Web3 ecosystem. Our platform provides tools for project discovery, collaboration,
                    and community building.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Key Features</h4>
                      <ul className="space-y-2 text-default-600">
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:check" className="text-success" />
                          Social interactions with on-chain verification
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:check" className="text-success" />
                          Project showcasing and discovery
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:check" className="text-success" />
                          Token-gated communities
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Get Started</h4>
                      <ul className="space-y-2 text-default-600">
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:wallet" className="text-primary" />
                          Connect your wallet
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:user" className="text-primary" />
                          Create your profile
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon icon="lucide:plus-circle" className="text-primary" />
                          Submit your first project
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </Tab>
            <Tab key="api" title="API Reference">
              <div className="py-4">
                <p className="text-default-600">Coming soon...</p>
              </div>
            </Tab>
            <Tab key="examples" title="Examples">
              <div className="py-4">
                <p className="text-default-600">Coming soon...</p>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};
