import React, { useState } from "react";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress"; // Ensure this is the path to your customized Progress component
import { Button } from "./ui/button";

interface FileUploaderProps {
  onUploadComplete?: () => void;
  onUploadError?: (errorMessage: string) => void;
}

const FileUploader = ({
  onUploadComplete,
  onUploadError,
}: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    setUploadProgress(0);
    if (file && file.size > 5e9) {
      onUploadError?.(
        "File is too large, please select a file smaller than 5GB."
      );
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const interval = setInterval(() => {
        setUploadProgress((oldProgress) => {
          const newProgress = oldProgress + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            onUploadComplete?.();
            return 100;
          }
          return newProgress;
        });
      }, 200);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <Input
        disabled={uploadProgress > 0}
        accept=".txt, .csv"
        className="w-2/3 my-5"
        type="file"
        onChange={handleFileChange}
      />
      <Progress
        hidden={uploadProgress === 0}
        className="w-2/3 my-10"
        value={uploadProgress}
        color={uploadProgress < 100 ? "blue" : "green"} // Using direct color values for example
      />
      <p
        hidden={uploadProgress !== 100}
        className="text-center mb-4 text-lg text-green-500"
      >
        Upload Complete!
      </p>
      <Button
        disabled={uploadProgress > 0 || !selectedFile}
        className="self-end mt-auto bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        variant="outline"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </div>
  );
};

export default FileUploader;
