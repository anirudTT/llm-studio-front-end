import React from "react";
import logo from "../assets/tt_logo.svg";
import { DarkModeToggle } from "./DarkModeToggle";

export function NavBar() {
  return (
    <div className="flex items-center py-5 px-10 border-b-4 bg-secondary">
      <img src={logo} alt="Finetuner Logo" className="w-16 h-16 mr-4" />
      <h1 className="text-4xl flex-grow text-white">Finetuner</h1>
      <DarkModeToggle />
    </div>
  );
}
