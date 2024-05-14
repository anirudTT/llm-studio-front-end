import React from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "./ui/button";

const HelpIcon: React.FC = () => {
  const handleHelpClick = (): void => {
    alert("Add link to help docs!");
  };

  return (
    <Button variant="outline" size="icon" onClick={handleHelpClick}>
      <div className="flex items-center justify-center transform transition duration-300 hover:scale-110">
        <HelpCircle className="h-[1.4rem] w-[1.4rem] text-gray-600 dark:text-white hover:text-blue-500 dark:hover:text-blue-300" />
        <span className="sr-only">Help</span>
      </div>
    </Button>
  );
};

export default HelpIcon;
