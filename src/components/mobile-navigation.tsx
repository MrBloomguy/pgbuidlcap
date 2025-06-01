import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "@heroui/react";

const mobileLinks = [
  {
    path: "/explore",
    icon: "lucide:compass",
    label: "Explore",
    key: "explore",
  },
  {
    path: "/submit",
    icon: "lucide:plus-circle",
    label: "Submit",
    key: "submit",
  },
  {
    path: "/search",
    icon: "lucide:search",
    label: "Search",
    key: "search",
  },
  {
    path: "/domains",
    icon: "lucide:grid",
    label: "Domain",
    key: "domains",
  },
  {
    path: "/leaderboard",
    icon: "lucide:trophy",
    label: "Ranks",
    key: "leaderboard",
  },
  {
    path: "/profile",
    icon: "lucide:user",
    label: "Profile",
    key: "profile",
  },
];

export const MobileNavigation = () => {
  const [activeTab, setActiveTab] = React.useState("markets");
  
  const handleTabChange = (path: string, key: string) => {
    setActiveTab(key);
    const event = new CustomEvent('mobileNavChange', { detail: { tab: key } });
    window.dispatchEvent(event);
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/70 backdrop-blur-md border-t border-divider z-50 h-12 md:hidden">
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-2">
        {mobileLinks.map((link) => (
          <button
            key={link.key}
            className="h-full"
            onClick={(e) => {
              e.preventDefault();
              handleTabChange(link.path, link.key);
            }}
          >
            <NavButton 
              icon={link.icon}
              label={link.label}
              isActive={activeTab === link.key}
            />
          </button>
        ))}
      </div>
    </nav>
  );
};

interface NavButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
}

const NavButton = ({ icon, label, isActive }: NavButtonProps) => (
  <div className="flex flex-col items-center justify-center w-12 h-full">
    <div className={`flex items-center justify-center transition-colors ${isActive ? 'text-primary' : 'text-default-500'}`}>
      <Icon icon={icon} width={18} height={18} />
    </div>
    <span className={`text-[10px] mt-0.5 transition-colors ${isActive ? 'text-primary' : 'text-default-500'}`}>
      {label}
    </span>
  </div>
);