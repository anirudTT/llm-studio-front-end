import { NavLink } from "react-router-dom";
import logo from "../assets/tt_logo.svg";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Home, BrainCog } from "lucide-react";
import { ModeToggle } from "./DarkModeToggle";
import HelpIcon from "./HelpIcon";
import { useTheme } from "../providers/ThemeProvider";
import { Separator } from "./ui/separator";

export default function NavBar() {
  const { theme } = useTheme();

  const iconColor = theme === "dark" ? "text-white" : "text-black";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const hoverTextColor =
    theme === "dark" ? "hover:text-white" : "hover:text-gray-900";

  const navLinkClass = (isActive: boolean) =>
    `flex items-center px-2 py-2 rounded-md text-sm font-medium ${textColor} transition-all duration-300 ease-in-out ${
      isActive
        ? theme === "dark"
          ? "border-2 border-white"
          : "border-2 border-black"
        : "border-transparent"
    } ${hoverTextColor}`;

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between w-full px-4 py-2 sm:px-5 sm:py-3 bg-secondary border-b-4 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <a
            href="https://www.tenstorrent.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <img
              src={logo}
              alt="Tenstorrent Logo"
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow-inner transform transition duration-300 hover:scale-110"
            />
            <h4
              className={`hidden sm:block text-lg sm:text-2xl font-medium ${textColor} ml-3 bold font-roboto`}
            >
              llm-studio v0.0
            </h4>
          </a>
          <NavigationMenu className="flex-grow px-28">
            <NavigationMenuList className="flex justify-between">
              <NavigationMenuItem>
                <NavLink
                  to="/"
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  <Home className={`mr-1 ${iconColor}`} />
                  <span className="hidden sm:inline">Home</span>
                </NavLink>
              </NavigationMenuItem>
              <Separator
                className="h-6 w-px bg-zinc-400"
                orientation="vertical"
              />
              <NavigationMenuItem>
                <NavLink
                  to="/models-deployed"
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  <BrainCog className={`mr-1 ${iconColor}`} />
                  <span className="hidden sm:inline">Models Deployed</span>
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <ModeToggle />
          <Separator className="h-6 w-px bg-zinc-400" orientation="vertical" />
          <HelpIcon />
        </div>
      </div>
    </div>
  );
}
