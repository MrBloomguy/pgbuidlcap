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

export default function App() {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("6H");
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);

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
    <div className={theme === "dark" ? "dark" : "light"}>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar 
          maxWidth="full" 
          className="border-b border-divider compact-nav h-12"
          isBordered
        >
          <NavbarBrand>
            <div className="flex items-center gap-1">
              <Icon icon="lucide:bar-chart-2" className="text-secondary text-lg" />
              <p className="font-bold text-inherit text-sm hidden sm:block">CryptoTracker</p>
            </div>
          </NavbarBrand>
          
          <NavbarContent className="hidden md:flex gap-2" justify="center">
            <NavbarItem>
              <Input
                classNames={{
                  base: "max-w-full sm:max-w-[20rem]",
                  mainWrapper: "h-full",
                  input: "text-xs",
                  inputWrapper: "h-8 font-normal text-default-500 bg-default-100/50 compact-input",
                }}
                placeholder="Search tokens..."
                size="sm"
                startContent={<Icon icon="lucide:search" className="text-default-400 text-sm" />}
                type="search"
              />
            </NavbarItem>
          </NavbarContent>
          
          <NavbarContent justify="end">
            <NavbarItem className="hidden md:flex">
              <ThemeSwitcher />
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button 
                color="secondary" 
                variant="flat" 
                startContent={<Icon icon="lucide:download" />}
                size="sm"
                className="compact-button"
              >
                Get App
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button 
                color={isWalletConnected ? "success" : "primary"}
                variant="solid"
                className="hidden sm:flex compact-button"
                size="sm"
                onPress={handleConnectWallet}
              >
                {isWalletConnected ? (
                  <>
                    <Icon icon="lucide:check-circle" className="mr-1" size={14} />
                    <span className="truncate max-w-[80px]">0x1a2b...3c4d</span>
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </Button>
              <Button 
                isIconOnly 
                color={isWalletConnected ? "success" : "primary"}
                variant="solid"
                className="sm:hidden"
                size="sm"
                aria-label="Connect Wallet"
                onPress={handleConnectWallet}
              >
                <Icon icon={isWalletConnected ? "lucide:check-circle" : "lucide:wallet"} />
              </Button>
            </NavbarItem>
            <NavbarItem className="md:hidden">
              <Button 
                isIconOnly 
                variant="light" 
                onPress={() => setIsSidebarOpen(!isSidebarOpen)}
                size="sm"
                aria-label="Menu"
              >
                <Icon icon="lucide:menu" className="text-sm" />
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <div className="flex">
          {!isMobile && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
          
          <main className="flex-1 p-2">
            <Routes isWalletConnected={isWalletConnected} />
          </main>
        </div>
        
        {isMobile && <MobileNavigation />}
      </div>
    </div>
  );
}