import React from 'react';
import { Icon } from '@iconify/react';
import { Switch, Tooltip } from '@heroui/react';
import { useTheme } from "@heroui/use-theme";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  
  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    
    // Update HTML class for proper theme application
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <Tooltip 
      content={`Switch to ${isDark ? "light" : "dark"} mode`}
      placement="bottom"
    >
      <button 
        onClick={handleToggle}
        className="p-2 hover:bg-default-100 rounded-full transition-colors"
      >
        <Icon 
          icon={isDark ? "lucide:sun" : "lucide:moon"} 
          className={isDark ? "text-warning-500" : "text-secondary-500"} 
          size={16} 
        />
      </button>
    </Tooltip>
  );
};