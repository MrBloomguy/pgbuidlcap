import React from "react";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { Icon } from "@iconify/react";

interface DomainPageProps {
  onBack: () => void;
  isWalletConnected: boolean;
}

export const DomainPage: React.FC<DomainPageProps> = ({ isWalletConnected }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedDomain, setSelectedDomain] = React.useState<string | null>(null);
  
  const domainExtensions = [
    { ext: ".youbuidl", chain: "YouBuidl", icon: "heroui:square", color: "text-[#8dcc75]", desc: "The main YouBuidl domain" },
    { ext: ".givestation", chain: "GiveStation", icon: "heroui:square", color: "text-[#8dcc75]", desc: "For GiveStation community" }
  ];

  const handleSearch = () => {
    if (searchTerm) {
      setSelectedDomain(searchTerm);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative py-20 px-4 text-center space-y-6 bg-gradient-to-b from-primary/5 to-transparent">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Claim your <span className="text-[#8dcc75]">.youbuidl</span> &<br/>
          <span className="text-[#8dcc75]">.givestation</span> name
        </h1>
        <p className="text-default-500 max-w-2xl mx-auto">
          Own your digital identity. Register a unique name for your project, community,
          or yourself on the next generation of web3.
        </p>
        
        {/* Search Box */}
        <div className="max-w-xl mx-auto">
          <div className="flex gap-2 p-1 rounded-xl bg-content1">
            <Input
              classNames={{
                base: "flex-1",
                mainWrapper: "h-full",
                input: "text-base",
                inputWrapper: "h-12 font-normal shadow-none",
              }}
              placeholder="Search for a name..."
              size="lg"
              variant="bordered"
              value={searchTerm}
              onValueChange={setSearchTerm}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              size="lg"
              color="primary"
              className="px-8 font-semibold"
              onPress={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {selectedDomain && (
        <div className="max-w-4xl mx-auto p-4 space-y-6 mt-8">
          <div className="space-y-4">
            {domainExtensions.map(({ ext, chain, icon, color, desc }) => {
              const isAvailable = Math.random() > 0.3;
              const price = Math.floor(Math.random() * 50) + 10;
              
              return (
                <Card key={ext} className="border border-divider">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon icon={icon} className={color} width={20} height={20} />
                          <h3 className="text-xl font-semibold">{selectedDomain}{ext}</h3>
                        </div>
                        <p className="text-sm text-default-500">{desc}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {isAvailable ? (
                          <>
                            <div className="text-right">
                              <div className="text-sm text-default-500">Price</div>
                              <div className="font-semibold">${price} /year</div>
                            </div>
                            <Button
                              color="primary"
                              size="lg"
                              className="font-semibold"
                              disabled={!isWalletConnected}
                            >
                              Register
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="text-right">
                              <div className="text-sm text-danger">Taken</div>
                              <div className="text-sm text-default-500">Registered on May 1, 2025</div>
                            </div>
                            <Button
                              variant="flat"
                              size="lg"
                              className="font-semibold"
                              disabled={!isWalletConnected}
                            >
                              Make Offer
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Connect Wallet Notice */}
      {!isWalletConnected && selectedDomain && (
        <div className="max-w-4xl mx-auto p-4 mt-4">
          <Card className="border border-divider bg-primary/5">
            <CardBody className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold">Connect Wallet to Register</h3>
                  <p className="text-sm text-default-500">You need to connect your wallet to register domain names</p>
                </div>
                <Button 
                  color="primary"
                  size="lg"
                  className="font-semibold"
                  startContent={<Icon icon="heroui:wallet" width={20} height={20} />}
                >
                  Connect Wallet
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};