import React from "react";
import { useTheme } from "@heroui/use-theme";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import { WalletConnectButton } from "./components/wallet-connect";
import { TokenTable } from "./components/token-table";
import { Sidebar } from "./components/sidebar";
import { TimeFilter } from "./components/time-filter";
import { ThemeSwitcher } from "./components/theme-switcher";
import { MobileNavigation } from "./components/mobile-navigation";
import { Routes } from "./components/routes";
import { WalletConnectProvider } from "./components/wallet-connect";
import { Categories } from "./components/Categories";

function ProfileNavButton() {
  const navigate = useNavigate();
  return (
    <Button
      isIconOnly
      variant="light"
      aria-label="Profile"
      onClick={() => navigate("/profile")}
    >
      <Icon icon="lucide:user" width={20} height={20} />
    </Button>
  );
}

export default function App() {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <WalletConnectProvider>
        <div className={theme === "dark" ? "dark" : ""}>
          <div className="app-container min-h-screen bg-background text-foreground flex flex-col">
            {/* Fixed Header */}
            <Navbar 
              maxWidth="full" 
              className="fixed top-0 left-0 right-0 border-b border-divider h-12 bg-background/70 backdrop-blur-md z-50"
              isBordered
            >
              <NavbarContent justify="start">
                <NavbarItem className="md:hidden">
                  <Button 
                    isIconOnly 
                    variant="light" 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    size="sm"
                    aria-label="Menu"
                  >
                    <Icon icon="lucide:menu" width={14} height={14} />
                  </Button>
                </NavbarItem>
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
                <NavbarItem>
                  <Button
                    as={Link}
                    to="/search"
                    variant="bordered"
                    size="sm"
                    startContent={<Icon icon="lucide:sparkles" width={16} height={16} />}
                    className="font-medium text-sm border-default-200 hover:bg-default-100"
                  >
                    Buidl AI
                  </Button>
                </NavbarItem>
              </NavbarContent>

              <NavbarContent justify="end" className="gap-2">
                <NavbarItem className="hidden md:flex">
                  <ThemeSwitcher />
                </NavbarItem>
                <NavbarItem className="hidden md:flex">
                  <ProfileNavButton />
                </NavbarItem>
                <NavbarItem>
                  <WalletConnectButton />
                </NavbarItem>
              </NavbarContent>
            </Navbar>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden pt-12">
              {/* Sidebar */}
              <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

              {/* Main Scrollable Area */}
              <div className="flex-1 overflow-y-auto relative ml-0 md:ml-48">
                <div className="p-4">
                  <Routes />
                </div>
              </div>
            </main>

            {/* Mobile Navigation */}
            {isMobile && <MobileNavigation />}
          </div>
        </div>
      </WalletConnectProvider>
    </BrowserRouter>
  );
}