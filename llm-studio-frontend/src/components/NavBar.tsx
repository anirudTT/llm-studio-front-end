// import React from "react";
import logo from "../assets/tt_logo.svg";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center w-full">
      <div className="flex items-center">
        <img src={logo} alt="TT Logo" className="h-8 mr-4" />
        <h1>LLM Studio</h1>
      </div>
    </nav>
  );
}
