import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import FileUploader from "./FilesUploader";
// import { Upload } from "lucide-react";
import { FileUp } from "lucide-react";
{
  /* <FileUp /> */
}

const UploadDialog = () => {
  return (
    <>
      <Card className="h-auto py-4 px-6">
        <Dialog>
          <DialogTrigger className="float-right m-5">
            <Button className="float-right" variant="outline">
              <FileUp className="mr-2" />
              Upload Model Weights
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Models Weights</DialogTitle>
            </DialogHeader>
            <FileUploader
              onUploadComplete={() => console.log("Upload is complete!")}
              onUploadError={(errorMessage) =>
                console.error("Upload Error:", errorMessage)
              }
            />
            {/* {userData.data && <FileUploader user={userData.data} />} */}
          </DialogContent>
        </Dialog>
      </Card>
    </>
  );
};

export default UploadDialog;
