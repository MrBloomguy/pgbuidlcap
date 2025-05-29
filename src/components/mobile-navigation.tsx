import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const MobileNavigation = () => {
  const [activeTab, setActiveTab] = React.useState("home");
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Dispatch a custom event that Routes component will listen to
    const event = new CustomEvent('mobileNavChange', { 
      detail: { tab } 
    });
    window.dispatchEvent(event);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-content1 border-t border-divider py-1 px-2 md:hidden">
      <div className="flex items-center justify-around">
        <Button
          isIconOnly
          variant="light"
          aria-label="Home"
          className="flex flex-col items-center"
          size="sm"
          onPress={() => handleTabChange("home")}
        >
          <Icon icon="lucide:home" className={`text-sm ${activeTab === 'home' ? 'text-primary' : ''}`} />
          <span className={`text-[10px] mt-1 ${activeTab === 'home' ? 'text-primary' : ''}`}>Home</span>
        </Button>
        
        <Button
          isIconOnly
          variant="light"
          aria-label="Explore"
          className="flex flex-col items-center"
          size="sm"
          onPress={() => handleTabChange("explore")}
        >
          <Icon icon="lucide:compass" className={`text-sm ${activeTab === 'explore' ? 'text-primary' : ''}`} />
          <span className={`text-[10px] mt-1 ${activeTab === 'explore' ? 'text-primary' : ''}`}>Explore</span>
        </Button>
        
        <Button
          isIconOnly
          variant="light"
          aria-label="Domains"
          className="flex flex-col items-center"
          size="sm"
          onPress={() => handleTabChange("domains")}
        >
          <Icon icon="lucide:globe" className={`text-sm ${activeTab === 'domains' ? 'text-primary' : ''}`} />
          <span className={`text-[10px] mt-1 ${activeTab === 'domains' ? 'text-primary' : ''}`}>Domains</span>
        </Button>
        
        <Button
          isIconOnly
          variant="light"
          aria-label="Leaderboard"
          className="flex flex-col items-center"
          size="sm"
          onPress={() => handleTabChange("leaderboard")}
        >
          <Icon icon="lucide:trophy" className={`text-sm ${activeTab === 'leaderboard' ? 'text-primary' : ''}`} />
          <span className={`text-[10px] mt-1 ${activeTab === 'leaderboard' ? 'text-primary' : ''}`}>Leaders</span>
        </Button>
        
        <Button
          isIconOnly
          variant="light"
          aria-label="Profile"
          className="flex flex-col items-center"
          size="sm"
          onPress={() => handleTabChange("profile")}
        >
          <Icon icon="lucide:user" className={`text-sm ${activeTab === 'profile' ? 'text-primary' : ''}`} />
          <span className={`text-[10px] mt-1 ${activeTab === 'profile' ? 'text-primary' : ''}`}>Profile</span>
        </Button>
      </div>
    </div>
  );
};