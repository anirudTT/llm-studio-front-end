import React, { useState } from "react";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
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
    if (file) {
      if (file.size > 5000000000) {
        // 5GB limit
        onUploadError?.(
          "File is too large, please select a file smaller than 5GB."
        );
        setSelectedFile(null);
        setUploadProgress(0);
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const interval = setInterval(() => {
        setUploadProgress((oldProgress) => {
          if (oldProgress < 100) {
            return oldProgress + 10;
          }
          clearInterval(interval);
          onUploadComplete?.();
          return 100;
        });
      }, 200); // Simulate upload progress
    }
  };

  return (
    <div>
      <Input
        disabled={uploadProgress > 0}
        accept=".txt, .csv"
        className="w-2/3 mx-auto my-5"
        type="file"
        onChange={handleFileChange}
      />
      <Progress
        hidden={uploadProgress === 0}
        className="my-10"
        value={uploadProgress}
      />
      <h1 hidden={uploadProgress !== 100} className="text-center">
        Upload Complete!
      </h1>
      <Button
        disabled={uploadProgress > 0 || !selectedFile}
        className="float-end"
        variant="outline"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </div>
  );
};

export default FileUploader;
