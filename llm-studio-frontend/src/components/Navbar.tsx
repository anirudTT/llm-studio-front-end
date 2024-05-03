import React from "react";
import logo from "../assets/tt_logo.svg";
import { DarkModeToggle } from "./DarkModeToggle";

export function NavBar() {
  return (
    <div className="flex items-center p-4">
      <img src={logo} alt="Finetuner Logo" className="w-96 h-16 mr-12" />
      <h1 className="text-4xl flex-grow">Finetuner</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <DarkModeToggle />
    </div>
  );
}
