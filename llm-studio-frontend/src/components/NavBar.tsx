import React from "react";
import logo from "../assets/tt_logo.svg";
import { ModeToggle } from "./DarkModeToggle";

export default function NavBar() {
  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center w-full px-5 py-3 bg-secondary border-b-4">
        <div className="flex items-center">
          <img src={logo} className="w-10 mr-4" alt="Logo" />
          <h1 className="text-2xl">LLM STUDIO V0</h1>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}
