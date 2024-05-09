import React, { useState } from "react";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

const FileUploader = () => {
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      console.log("Selected file:", file.name); // Log the file name
      simulateLinkingAction();
    } else {
      setFileName("");
    }
  };

  const simulateLinkingAction = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + 10, 100);
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        return newProgress;
      });
    }, 50);
  };

  const displayFileName = () => {
    alert(`Selected File: ${fileName || "No file selected"}`);
  };

  const progressColorClass =
    uploadProgress < 100 ? "bg-blue-500" : "bg-green-500";

  return (
    <div className="flex flex-col items-center w-full p-4">
      <Input
        accept=".txt, .csv" // Specify accepted file types
        className="w-2/3 my-5"
        type="file"
        onChange={handleFileChange}
      />
      <Progress
        hidden={uploadProgress === 0}
        className="w-2/3 my-10"
        value={uploadProgress}
        colorClass={progressColorClass}
      />
      <p className="text-center mb-4 text-lg">
        Selected File: {fileName || "No file selected"}
      </p>
      <Button
        className="self-end mt-auto bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={uploadProgress !== 100 || !fileName}
        onClick={displayFileName}
      >
        Show Selected File Name
      </Button>
    </div>
  );
};

export default FileUploader;
