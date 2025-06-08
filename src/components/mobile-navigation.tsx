import React from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

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
    label: "Agent",
    key: "search",
  },
  {
    path: "/profile",
    icon: "lucide:user",
    label: "Profile",
    key: "profile",
  },
];

export const MobileNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-divider z-50 py-1 px-2 md:hidden">
      <div className="flex justify-around items-center">
        {mobileLinks.map((link) => (
          <Link
            key={link.key}
            to={link.path}
            className={`flex flex-col items-center p-2 min-w-[64px] ${
              currentPath === link.path ? "text-primary" : "text-default-500"
            }`}
          >
            <Icon 
              icon={link.icon} 
              width={20} 
              height={20} 
              className={currentPath === link.path ? "text-primary" : ""} 
            />
            <span className="text-xs mt-1">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};