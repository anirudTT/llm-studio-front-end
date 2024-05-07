import React from "react";

import { ModelsDeployedTable } from "../components/ModelsDeployedTable";

const ModelsDeployed = () => {
  return (
    <>
      <div className="flex flex-col h-screen md:px-20 ">
        <ModelsDeployedTable />
      </div>
      {/* </div> */}
    </>
  );
};

export default ModelsDeployed;
