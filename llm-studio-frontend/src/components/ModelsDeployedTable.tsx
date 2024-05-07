import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Button } from "./ui/button";

const modelsDeployed = [
  {
    id: 1,
    modelName: "Falcon",
    status: "Deployed",
  },
  {
    id: 2,
    modelName: "Mixtral",
    status: "Deployed",
  },
  {
    id: 3,
    modelName: "resnet50",
    status: "Deployed",
  },
  {
    id: 4,
    modelName: "Bert",
    status: "Stopped",
  },
];

export function ModelsDeployedTable() {
  return (
    <Table>
      <TableCaption>Models Deployed</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Model Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Manage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modelsDeployed.map((model) => (
          <TableRow key={model.id}>
            <TableCell>{model.id}</TableCell>
            <TableCell>{model.modelName}</TableCell>
            <TableCell>{model.status}</TableCell>
            <TableCell>
              <div style={{ display: "flex", gap: "55px" }}>
                <Button>Delete</Button>
                <Button>Redeploy</Button>
                <Button>ChatUI</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
