import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "../providers/ThemeProvider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-300 ease-in-out ${
            theme === "dark" ? "hover:bg-blue-700" : "hover:bg-gray-300"
          }`}
        >
          <Sun
            className={`h-[1.4rem] w-[1.4rem] text-yellow-600 dark:text-yellow-500 shadow-xl rotate-0 scale-100 transition-transform duration-300 ease-in-out dark:-rotate-90 dark:scale-0 stroke-current stroke-1 hover:scale-110`}
          />
          <Moon
            className={`absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-transform duration-300 ease-in-out dark:rotate-0 dark:scale-100 hover:scale-110`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
