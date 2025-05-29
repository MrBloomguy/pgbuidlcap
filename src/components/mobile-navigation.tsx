import React from "react";
import { Icon } from "@iconify/react";

export const MobileNavigation = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const event = new CustomEvent('mobileNavChange', { detail: { tab } });
    window.dispatchEvent(event);
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/70 backdrop-blur-md border-t border-divider z-50 h-12 md:hidden">
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-2">
        <NavButton icon="lucide:home" label="Home" isActive={activeTab === 'home'} onClick={() => handleTabChange("home")} />
        <NavButton icon="lucide:compass" label="Explore" isActive={activeTab === 'explore'} onClick={() => handleTabChange("explore")} />
        <NavButton icon="lucide:trending-up" label="Markets" isActive={activeTab === 'markets'} onClick={() => handleTabChange("markets")} />
        <NavButton icon="lucide:grid" label="Domains" isActive={activeTab === 'domains'} onClick={() => handleTabChange("domains")} />
        <NavButton icon="lucide:user" label="Profile" isActive={activeTab === 'profile'} onClick={() => handleTabChange("profile")} />
      </div>
    </nav>
  );
};

interface NavButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavButton = ({ icon, label, isActive, onClick }: NavButtonProps) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center w-12 h-full"
  >
    <div className={`flex items-center justify-center transition-colors ${isActive ? 'text-primary' : 'text-default-500'}`}>
      <Icon icon={icon} width={18} height={18} />
    </div>
    <span className={`text-[10px] mt-0.5 transition-colors ${isActive ? 'text-primary' : 'text-default-500'}`}>
      {label}
    </span>
  </button>
);