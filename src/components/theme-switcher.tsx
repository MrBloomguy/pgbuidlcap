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
      <div className="flex items-center gap-1">
        <Icon icon="lucide:sun" className={`text-default-500 ${!isDark && "text-warning-500"}`} size={14} />
        <Switch 
          isSelected={isDark}
          onValueChange={handleToggle}
          size="sm"
          color="secondary"
          className="mx-0.5 scale-75"
        />
        <Icon icon="lucide:moon" className={`text-default-500 ${isDark && "text-secondary-500"}`} size={14} />
      </div>
    </Tooltip>
  );
};