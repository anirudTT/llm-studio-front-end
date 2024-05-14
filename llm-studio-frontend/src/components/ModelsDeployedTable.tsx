import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { useTheme } from "../providers/ThemeProvider";
const initialModelsDeployed = [
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
    modelName: "Lama-2-70B",
    status: "Deployed",
  },
];

export function ModelsDeployedTable() {
  const [modelsDeployed, setModelsDeployed] = useState(initialModelsDeployed);
  const [fadingModels, setFadingModels] = useState<number[]>([]);
  const theme = useTheme(); // Using the theme from context

  const handleDelete = (modelId: number) => {
    console.log(`Delete button clicked for model ID: ${modelId}`);
    setFadingModels((prev) => [...prev, modelId]);
  };

  const handleRedeploy = (modelName: string) => {
    console.log(`Redeploy button clicked for model: ${modelName}`);
    // Add your logic here for what happens when a model is redeployed
  };

  const handleChatUI = (modelName: string) => {
    console.log(`ChatUI button clicked for model: ${modelName}`);
    // Add your logic here for what happens when the ChatUI button is clicked
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setModelsDeployed((prevModels) =>
        prevModels.filter((model) => !fadingModels.includes(model.id))
      );
    }, 30000);
    return () => clearTimeout(timer);
  }, [fadingModels]);

  return (
    <Card>
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
            <TableRow
              key={model.id}
              className={`transition-colors duration-1000 ${
                fadingModels.includes(model.id)
                  ? theme.theme === "dark"
                    ? "bg-gray-900 opacity-50"
                    : "bg-gray-200 opacity-50"
                  : ""
              }`}
            >
              <TableCell>{model.id}</TableCell>
              <TableCell>{model.modelName}</TableCell>
              <TableCell>{model.status}</TableCell>
              <TableCell>
                <div className="flex gap-4">
                  {fadingModels.includes(model.id) ? (
                    <Button onClick={() => handleRedeploy(model.modelName)}>
                      Redeploy
                    </Button>
                  ) : (
                    <>
                      <Button onClick={() => handleDelete(model.id)}>
                        Delete
                      </Button>
                      <Button onClick={() => handleChatUI(model.modelName)}>
                        ChatUI
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
