import logo from "../assets/tt_logo.svg";
import { DarkModeToggle } from "./DarkModeToggle";

export function NavBar() {
  return (
    <div className="flex items-center justify-between p-5 border-b-4 bg-gray-800 text-white">
      <img src={logo} alt="LLM Studio Logo" className="w-16 h-16 mr-4" />
      <h1 className="text-3xl font-semibold">LLM Studio</h1>
      <DarkModeToggle />
    </div>
  );
}
