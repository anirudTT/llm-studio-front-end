import React from "react";
import { ModelsDeployedTable } from "../components/ModelsDeployedTable";

const ModelsDeployed = () => {
  return (
    <div className="flex flex-col h-screen md:px-20 pt-8">
      <ModelsDeployedTable />
    </div>
  );
};

export default ModelsDeployed;
