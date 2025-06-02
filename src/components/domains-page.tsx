import React from "react";
import { Card, CardBody, CardHeader, Avatar, Button, Chip, Input, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { REGISTRAR_ADDRESS, REGISTRAR_ABI } from '../contracts/YouBuildRegistrar';
import { formatEther } from 'viem';

interface DomainInfo {
  name: string;
  owner: string;
  expiry: bigint;
  extension: string;
}

const contractConfig = {
  address: REGISTRAR_ADDRESS as `0x${string}`,
  abi: REGISTRAR_ABI,
} as const;

export const DomainsPage: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [activeTab, setActiveTab] = React.useState<'all' | 'youbuidl' | 'givestation' | 'owned'>('all');
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedDomain, setSelectedDomain] = React.useState<string | null>(null);
  const [registrationStatus, setRegistrationStatus] = React.useState<'idle' | 'registering' | 'success' | 'error'>('idle');
  
  // Contract interactions
  const { data: registeredDomains, isLoading } = useContractRead({
    ...contractConfig,
    functionName: 'getRegisteredDomains',
    watch: true, // Keep data fresh
  });

  const { data: isAvailable } = useContractRead({
    ...contractConfig,
    functionName: 'isAvailable',
    args: [selectedDomain || ''],
    enabled: !!selectedDomain,
  });

  const { data: price } = useContractRead({
    ...contractConfig,
    functionName: 'getPrice',
    args: [selectedDomain || ''],
    enabled: !!selectedDomain,
  });

  const { write: registerDomain } = useContractWrite({
    ...contractConfig,
    functionName: 'register',
    onSuccess: () => setRegistrationStatus('success'),
    onError: () => setRegistrationStatus('error'),
  });

  const getDefaultImage = (name: string) => {
    return `https://img.heroui.chat/image/avatar?w=64&h=64&u=${name}`;
  };

  const getDomainStatus = (expiryTimestamp: bigint) => {
    const now = BigInt(Math.floor(Date.now() / 1000));
    const thirtyDays = BigInt(30 * 24 * 60 * 60);
    
    if (expiryTimestamp < now) return 'expired';
    if (expiryTimestamp - now < thirtyDays) return 'grace';
    return 'active';
  };

  const processedDomains = React.useMemo(() => {
    if (!registeredDomains) return [];
    
    return registeredDomains.map((domain: DomainInfo, index: number) => ({
      id: index.toString(),
      name: domain.name,
      extension: domain.extension as '.youbuidl' | '.givestation',
      owner: domain.owner,
      expiry: new Date(Number(domain.expiry) * 1000).toISOString(),
      image: getDefaultImage(domain.name),
      status: getDomainStatus(domain.expiry)
    }));
  }, [registeredDomains]);

  const filteredDomains = processedDomains.filter(domain => {
    if (searchTerm && !domain.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (activeTab === 'youbuidl') return domain.extension === '.youbuidl';
    if (activeTab === 'givestation') return domain.extension === '.givestation';
    if (activeTab === 'owned') return domain.owner.toLowerCase() === address?.toLowerCase();
    return true;
  });

  const [registrationError, setRegistrationError] = React.useState<string | null>(null);

  const handleRegistration = async (domain: string, extension: string) => {
    if (!isConnected) {
      setRegistrationError('Please connect your wallet first');
      return;
    }
    if (!price) {
      setRegistrationError('Could not determine registration price');
      return;
    }
    
    setRegistrationStatus('registering');
    setRegistrationError(null);
    
    try {
      await registerDomain({
        args: [domain + extension],
        value: price,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      setRegistrationStatus('error');
      setRegistrationError(
        error instanceof Error ? error.message : 'Failed to register domain. Please try again.'
      );
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      setSelectedDomain(searchTerm);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <Icon icon="lucide:wallet" className="w-16 h-16 text-default-300" />
        <h2 className="text-xl font-bold text-default-600">Connect Your Wallet</h2>
        <p className="text-default-400 text-center max-w-md">
          Connect your wallet to view and manage domain names
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      {/* Hero Section with Search */}
      <div className="relative py-20 px-4 text-center space-y-6 bg-gradient-to-b from-primary/5 to-transparent">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Build Your Web3 Identity with<br/>
          <span className="text-[#8dcc75]">.youbuidl</span> & <span className="text-[#8dcc75]">.givestation</span>
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

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex border-b border-divider mb-6">
          {[
            { id: 'all', label: 'All Domains' },
            { id: 'youbuidl', label: '.youbuidl' },
            { id: 'givestation', label: '.givestation' },
            { id: 'owned', label: 'My Domains' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`
                px-4 py-2 -mb-px font-medium
                ${activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-default-500 hover:text-default-900'
                }
              `}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Domain Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-default-500">
              <Spinner size="lg" />
              <p className="mt-4">Loading domains...</p>
            </div>
          ) : filteredDomains.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-default-500">
              <Icon icon="lucide:search-x" className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">No domains found</p>
              <p className="text-sm mt-1">
                {searchTerm ? 
                  'Try a different search term or register this domain name.' :
                  activeTab === 'owned' ? 
                    'You haven\'t registered any domains yet.' :
                    'No domains have been registered yet.'
                }
              </p>
            </div>
          ) : filteredDomains.map((domain) => (
            <Card key={domain.id} className="border border-divider">
              <CardHeader className="flex items-center gap-3">
                <Avatar src={domain.image} />
                <div>
                  <h4 className="font-semibold">{domain.name}{domain.extension}</h4>
                  <p className="text-xs text-default-500 mt-0.5">
                    {domain.owner.toLowerCase() === address?.toLowerCase() 
                      ? 'You' 
                      : `${domain.owner.slice(0, 6)}...${domain.owner.slice(-4)}`
                    }
                  </p>
                </div>
              </CardHeader>
              <CardBody className="p-4 pt-0 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-default-500">Expires</p>
                    <p className="text-sm">{new Date(domain.expiry).toLocaleDateString()}</p>
                  </div>
                  <Chip
                    size="sm"
                    color={domain.status === 'active' ? 'success' : domain.status === 'grace' ? 'warning' : 'danger'}
                  >
                    {domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
                  </Chip>
                </div>
                {domain.owner.toLowerCase() === address?.toLowerCase() ? (
                  <Button 
                    size="sm" 
                    color="primary" 
                    variant="flat" 
                    className="w-full"
                    startContent={<Icon icon="lucide:edit-3" width={14} />}
                    href={`/domains/${domain.name}${domain.extension}/manage`}
                  >
                    Manage
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="flat"
                    className="w-full"
                    startContent={<Icon icon="lucide:message-circle" width={14} />}
                  >
                    Make Offer
                  </Button>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Domain Registration - Only show when searching */}
      {selectedDomain && (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          <div className="space-y-4">
            {[
              { ext: '.youbuidl', chain: 'YouBuidl', desc: 'The main YouBuidl domain' },
              { ext: '.givestation', chain: 'GiveStation', desc: 'For GiveStation community' }
            ].map(({ ext, chain, desc }) => {
              const isCheckingAvailability = selectedDomain && isAvailable === undefined;
              const isDomainAvailable = Boolean(isAvailable) && !filteredDomains.some(
                d => d.name.toLowerCase() === selectedDomain.toLowerCase() && d.extension === ext
              );
              
              return (
                <Card key={ext} className="border border-divider">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{selectedDomain}{ext}</h3>
                        <p className="text-sm text-default-500">{desc}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {isCheckingAvailability ? (
                          <div className="flex items-center gap-2 text-default-500">
                            <Spinner size="sm" />
                            <span>Checking availability...</span>
                          </div>
                        ) : isDomainAvailable ? (
                          <>
                            <div className="text-right">
                              <div className="text-sm text-default-500">Price</div>
                              <div className="font-semibold">{price ? `${formatEther(price)} ETH` : 'Loading...'} /year</div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Button
                                color={registrationError ? 'danger' : 'primary'}
                                size="lg"
                                className="font-semibold"
                                disabled={!isConnected || registrationStatus === 'registering'}
                                onClick={() => handleRegistration(selectedDomain, ext)}
                              >
                                {registrationStatus === 'registering' ? 'Registering...' : 'Register'}
                              </Button>
                              {registrationError && (
                                <p className="text-xs text-danger">{registrationError}</p>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-sm text-danger font-medium">Taken</div>
                            <Button
                              variant="flat"
                              size="lg"
                              className="font-semibold"
                              disabled={!isConnected}
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
    </div>
  );
};