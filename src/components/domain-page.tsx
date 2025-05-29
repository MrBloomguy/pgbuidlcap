import React from "react";
import { Button, Card, CardBody, Input, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

interface DomainPageProps {
  onBack: () => void;
  isWalletConnected: boolean;
}

export const DomainPage: React.FC<DomainPageProps> = ({ onBack, isWalletConnected }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedDomain, setSelectedDomain] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("search");
  
  const domainExtensions = [".eth", ".base", ".sol", ".crypto"];
  
  const handleSearch = () => {
    if (searchTerm) {
      setSelectedDomain(searchTerm);
    }
  };
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button 
          variant="light" 
          size="sm" 
          onPress={onBack}
          startContent={<Icon icon="lucide:arrow-left" size={14} />}
        >
          Back
        </Button>
        
        <div className="flex gap-1">
          <Button 
            variant="flat" 
            size="sm" 
            color="secondary"
            disabled={!isWalletConnected}
          >
            My Domains
          </Button>
        </div>
      </div>
      
      <Card>
        <CardBody className="p-3">
          <h2 className="text-base font-semibold mb-3">Domain Name Service</h2>
          
          <div className="flex border border-divider rounded-md overflow-hidden mb-3">
            <Button 
              variant="flat" 
              className={`rounded-none flex-1 text-xs ${activeTab === 'search' ? 'bg-content2' : ''}`}
              size="sm"
              onPress={() => setActiveTab("search")}
            >
              Search
            </Button>
            <Button 
              variant="flat" 
              className={`rounded-none flex-1 text-xs ${activeTab === 'popular' ? 'bg-content2' : ''}`}
              size="sm"
              onPress={() => setActiveTab("popular")}
            >
              Popular
            </Button>
            <Button 
              variant="flat" 
              className={`rounded-none flex-1 text-xs ${activeTab === 'trending' ? 'bg-content2' : ''}`}
              size="sm"
              onPress={() => setActiveTab("trending")}
            >
              Trending
            </Button>
          </div>
          
          {activeTab === "search" && (
            <>
              <div className="flex gap-2 mb-4">
                <Input
                  classNames={{
                    base: "flex-1",
                    mainWrapper: "h-full",
                    input: "text-xs",
                    inputWrapper: "h-8 font-normal domain-search-input",
                  }}
                  placeholder="Enter domain name"
                  size="sm"
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                  startContent={<Icon icon="lucide:search" className="text-default-400" size={14} />}
                />
                <Button 
                  color="secondary" 
                  size="sm"
                  onPress={handleSearch}
                >
                  Search
                </Button>
              </div>
              
              {selectedDomain && (
                <Card className="domain-card mb-4">
                  <CardBody className="p-3">
                    <h3 className="text-sm font-medium mb-2">Domain Availability</h3>
                    
                    <div className="space-y-2">
                      {domainExtensions.map((ext) => {
                        const isAvailable = Math.random() > 0.5;
                        
                        return (
                          <div key={ext} className="flex items-center justify-between p-2 border-b border-divider">
                            <div className="flex items-center gap-2">
                              <Icon 
                                icon={isAvailable ? "lucide:check-circle" : "lucide:x-circle"} 
                                className={isAvailable ? "text-success" : "text-danger"}
                                size={16}
                              />
                              <span className="text-xs font-medium">{selectedDomain}{ext}</span>
                            </div>
                            <div>
                              {isAvailable ? (
                                <Button 
                                  size="sm" 
                                  color="primary"
                                  className="text-[10px] h-6 px-2"
                                  disabled={!isWalletConnected}
                                >
                                  Register
                                </Button>
                              ) : (
                                <span className="text-xs text-danger">Taken</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {!isWalletConnected && (
                      <div className="mt-3 p-2 bg-content2 rounded-md text-center">
                        <p className="text-xs text-default-500 mb-2">Connect your wallet to register domains</p>
                        <Button size="sm" color="primary">Connect Wallet</Button>
                      </div>
                    )}
                  </CardBody>
                </Card>
              )}
            </>
          )}
          
          {activeTab === "popular" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {["crypto", "defi", "nft", "dao", "web3", "metaverse"].map((domain) => (
                <Card key={domain} className="domain-card">
                  <CardBody className="p-2">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-medium mb-1">{domain}.eth</span>
                      <Button 
                        size="sm" 
                        variant="flat" 
                        color="secondary"
                        className="text-[10px] h-6 w-full"
                        disabled={!isWalletConnected}
                      >
                        Check
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
          
          {activeTab === "trending" && (
            <div className="space-y-2">
              {["bitcoin", "solana", "ethereum", "meme", "ai", "token"].map((domain, index) => (
                <div key={domain} className="flex items-center justify-between p-2 border-b border-divider">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium w-5 text-center">{index + 1}</span>
                    <span className="text-xs font-medium">{domain}.eth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-default-400">{Math.floor(Math.random() * 100) + 10} searches</span>
                    <Button 
                      size="sm" 
                      variant="flat" 
                      color="secondary"
                      className="text-[10px] h-6 px-2"
                      disabled={!isWalletConnected}
                    >
                      Check
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};