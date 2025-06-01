import React from 'react';
import { Icon } from '@iconify/react';
import { Switch } from '@heroui/react';
import { useTheme } from "@heroui/use-theme";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    
    // Save the theme preference
    try {
      localStorage.setItem('theme-preference', nextTheme);
    } catch (e) {
      console.error('Failed to save theme preference:', e);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-default-100"
      aria-label="Toggle theme"
    >
      <Icon
        icon={theme === 'light' ? 'lucide:moon' : 'lucide:sun'}
        className={theme === 'light' ? 'text-default-500' : 'text-default-400'}
        width={18}
        height={18}
      />
    </button>
  );
};