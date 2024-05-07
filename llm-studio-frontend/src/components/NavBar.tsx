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
  const { theme } = useTheme(); // Get the current theme from the hook
  console.log("Theme:", theme); // Log current theme to debug

  // Dynamic styling based on theme for icons and text
  const iconColor = theme === "dark" ? "text-white" : "text-black";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const hoverTextColor =
    theme === "dark" ? "hover:text-white" : "hover:text-gray-900";

  // NavLink dynamic class function with TypeScript typing for isActive
  const navLinkClass = (isActive: boolean) => {
    console.log("IsActive:", isActive); // Log isActive to debug
    return `flex items-center px-3 py-2 rounded-md text-sm font-medium ${textColor} transition-all duration-300 ease-in-out ${
      isActive
        ? theme === "dark"
          ? "border-b-2 border-white"
          : "border-b-2 border-black"
        : "border-transparent"
    } ${hoverTextColor}`;
  };

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
              alt="Tenstorrent Logo"
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow-inner transform transition duration-300 hover:scale-110"
            />
            <h1
              className={`hidden sm:block text-lg sm:text-2xl ${textColor} ml-3 mr-16`}
            >
              llm studio v0.0
            </h1>
          </a>
          <NavigationMenu className="flex-grow">
            <NavigationMenuList className="flex justify-between">
              <NavigationMenuItem>
                <NavLink
                  to="/"
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  <Home className={`mr-2 ${iconColor}`} />
                  <span className="hidden sm:inline">Home</span>
                </NavLink>
              </NavigationMenuItem>
              {/* //!TODO Add a separator between the Home and Models Deployed links */}
              {/* <div className="mx-2"> */}
              {/* <Separator orientation="vertical" className="bg-gray-500 w-1" /> */}
              {/* </div> */}
              <NavigationMenuItem>
                <NavLink
                  to="/models-deployed"
                  className={({ isActive }) => navLinkClass(isActive)}
                >
                  <BrainCog className={`mr-2 ${iconColor}`} />
                  <span className="hidden sm:inline">Models Deployed</span>
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
