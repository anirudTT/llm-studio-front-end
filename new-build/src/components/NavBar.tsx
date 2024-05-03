import React from "react";
import logo from "../assets/tt_logo.svg";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export function NavBar() {
  return (
    <div className="flex p-5 pb-1 border-b-4 bg-gray-500">
      <NavigationMenu className="bg-gray-800 fixed top-0 left-0 w-full shadow-md z-50">
        <NavigationMenuList className="flex items-center justify-between p-4 h-30 max-w-7xl mx-auto">
          <NavigationMenuItem className="flex items-center">
            <img src={logo} alt="Logo" className="w-16 mr-4" />
            <NavigationMenuLink className="text-4xl text-white no-underline">
              LLM Studio
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
