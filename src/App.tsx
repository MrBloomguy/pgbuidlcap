import React from "react";
import { useTheme } from "@heroui/use-theme";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link, Input, Tabs, Tab, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TokenTable } from "./components/token-table";
import { Sidebar } from "./components/sidebar";
import { TimeFilter } from "./components/time-filter";
import { ThemeSwitcher } from "./components/theme-switcher";
import { MobileNavigation } from "./components/mobile-navigation";
import { MarketStats } from "./components/market-stats";
import { Routes } from "./components/routes";
import { WalletConnectProvider, WalletConnectButton } from "./components/wallet-connect";

export default function App() {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("6H");
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const [account, setAccount] = React.useState<string>();

  // Listen for wallet connection events
  React.useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      setIsWalletConnected(accounts.length > 0);
      setAccount(accounts[0]);
    };

    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      // Check initial connection state
      (window as any).ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          setIsWalletConnected(accounts.length > 0);
          setAccount(accounts[0]);
        });
    }

    return () => {
      if ((window as any).ethereum) {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <WalletConnectProvider>
      <div className={theme === "dark" ? "dark" : "light"}>
        <div className="min-h-screen h-screen bg-background text-foreground flex flex-col">
          {/* Fixed Header */}
          <Navbar 
            maxWidth="full" 
            className="border-b border-divider compact-nav h-12 bg-background/70 backdrop-blur-md"
            isBordered
          >
          <NavbarContent className="gap-2">
            <NavbarBrand>
              <div className="flex items-center gap-2">
                <img src="/youbuidlsocialsvg.svg" alt="YouBuidl Logo" className="h-8 w-8" />
                <p className="font-bold text-inherit text-sm hidden sm:block">YouBuidl</p>
              </div>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4 flex-1 justify-center">
            <NavbarItem>
              <div className="relative w-[24rem] max-w-full">
                <Input
                  classNames={{
                    base: "w-full",
                    mainWrapper: "h-full",
                    input: "text-sm font-medium placeholder:text-default-400",
                    inputWrapper: "h-8 font-normal text-default-300 bg-default-100/60 border border-default-200 rounded-md hover:border-default-300 focus-within:border-primary focus-within:bg-background transition-all duration-200",
                  }}
                  placeholder="Search grants, projects, or builders..."
                  size="sm"
                  radius="md"
                  startContent={<Icon icon="lucide:search" className="text-default-400 flex-shrink-0" width={16} height={16} />}
                  endContent={
                    <Button 
                      size="sm" 
                      variant="light" 
                      isIconOnly
                      className="text-default-400"
                    >
                      <Icon icon="lucide:filter" width={14} height={14} />
                    </Button>
                  }
                  type="search"
                />
              </div>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="hidden md:flex">
            <NavbarItem>
              <div className="flex items-center gap-3">
                <Button
                  variant="light"
                  className="text-sm font-medium"
                  startContent={<Icon icon="lucide:compass" width={16} height={16} />}
                  onClick={() => {
                    const event = new CustomEvent('mobileNavChange', { detail: { tab: 'explore' } });
                    window.dispatchEvent(event);
                  }}
                >
                  Explore
                </Button>
                <Button
                  variant="light"
                  className="text-sm font-medium"
                  startContent={<Icon icon="lucide:search" width={16} height={16} />}
                  onClick={() => {
                    const event = new CustomEvent('mobileNavChange', { detail: { tab: 'search' } });
                    window.dispatchEvent(event);
                  }}
                >
                  Search
                </Button>
                <Button
                  variant="light"
                  className="text-sm font-medium"
                  startContent={<Icon icon="lucide:grid" width={16} height={16} />}
                  onClick={() => {
                    const event = new CustomEvent('mobileNavChange', { detail: { tab: 'domains' } });
                    window.dispatchEvent(event);
                  }}
                >
                  Domains
                </Button>
                <Button
                  variant="light"
                  className="text-sm font-medium"
                  startContent={<Icon icon="lucide:trophy" width={16} height={16} />}
                  onClick={() => {
                    const event = new CustomEvent('mobileNavChange', { detail: { tab: 'leaderboard' } });
                    window.dispatchEvent(event);
                  }}
                >
                  Leaderboard
                </Button>
                <Button
                  variant="light"
                  className="text-sm font-medium"
                  startContent={<Icon icon="lucide:user" width={16} height={16} />}
                  onClick={() => {
                    const event = new CustomEvent('mobileNavChange', { detail: { tab: 'profile' } });
                    window.dispatchEvent(event);
                  }}
                >
                  Profile
                </Button>
              </div>
            </NavbarItem>
          </NavbarContent>
          
          <NavbarContent justify="end">
            <NavbarItem className="hidden md:flex">
              <ThemeSwitcher />
            </NavbarItem>
          
            <NavbarItem>
              <WalletConnectButton 
                variant="solid"
                size="sm"
              />
            </NavbarItem>
            <NavbarItem className="md:hidden">
              <Button 
                isIconOnly 
                variant="light" 
                onPress={() => setIsSidebarOpen(!isSidebarOpen)}
                size="sm"
                aria-label="Menu"
              >
                <Icon icon="lucide:menu" width={14} height={14} />
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        {/* Main Content Area with Fixed Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Fixed Sidebar */}
          {!isMobile && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
          
          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto min-h-0">
            <div className="p-4 h-full flex flex-col">
              <Routes isWalletConnected={isWalletConnected} />
            </div>
          </main>
          </div>
          
          {/* Mobile Navigation */}
          {isMobile && <MobileNavigation />}
        </div>
      </div>
    </WalletConnectProvider>
  );
}