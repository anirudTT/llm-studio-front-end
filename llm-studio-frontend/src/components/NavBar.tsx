import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/tt_logo.svg";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Home, BrainCog } from "lucide-react";

import { ModeToggle } from "./DarkModeToggle";
import HelpIcon from "./HelpIcon";

export default function NavBar() {
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between w-full px-4 py-2 sm:px-5 sm:py-3 bg-secondary border-b-4 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-6 sm:space-x-8">
          <a
            href="https://www.tenstorrent.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-inner transform transition duration-300 hover:scale-110"
            />
            <h1 className="hidden sm:block text-lg sm:text-2xl text-gray-800 dark:text-white">
              LLM STUDIO V0
            </h1>
          </a>
          <NavigationMenu className="flex-grow">
            <NavigationMenuList className="flex justify-between">
              <NavigationMenuItem>
                <NavLink
                  to="/"
                  className={`${navigationMenuTriggerStyle()} hover:text-opacity-70 flex items-center`}
                >
                  <Home className="mr-2" /> Home
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink
                  to="/models-deployed"
                  className={`${navigationMenuTriggerStyle()} hover:text-opacity-70 flex items-center`}
                >
                  <BrainCog className="mr-2" /> Models Deployed
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ModeToggle />
          <HelpIcon />
        </div>
      </div>
    </div>
  );
}
