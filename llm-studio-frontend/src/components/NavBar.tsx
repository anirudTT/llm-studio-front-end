import logo from "../assets/tt_logo.svg";
import { ModeToggle } from "./DarkModeToggle";

export default function NavBar() {
  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center w-full px-5 py-3 bg-secondary border-b-4 rounded-2xl shadow-xl">
        <div className="flex items-center">
          <a
            href="https://www.tenstorrent.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logo}
              className="w-10 h-10 mr-4 rounded-full shadow-inner transform transition duration-300 hover:scale-110"
              alt="Logo"
            />
          </a>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            LLM STUDIO V0
          </h1>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}
