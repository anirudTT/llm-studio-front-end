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

export default function NavBar() {
  const { theme } = useTheme(); // Get the current theme from the hook

  // Dynamic styling based on theme
  const iconColor = theme === "dark" ? "text-white" : "text-black";

  // NavLink dynamic class function with TypeScript typing for isActive
  const navLinkClass = (isActive: boolean) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium border-transparent transition-all duration-300 ease-in-out ${
      isActive
        ? theme === "dark"
          ? "border-b-2 border-blue-500 text-blue-300"
          : "border-b-2 border-orange-700 text-orange-500"
        : "hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700"
    } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      theme === "dark"
        ? "focus:ring-offset-gray-800 focus:ring-white"
        : "focus:ring-offset-white focus:ring-gray-600"
    }`;

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
            <h1 className="hidden sm:block text-lg sm:text-2xl text-gray-800 dark:text-white ml-3 mr-16">
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
