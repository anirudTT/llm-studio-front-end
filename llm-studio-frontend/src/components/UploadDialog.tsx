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

const UploadDialog = () => {
  return (
    <>
      <Card className="h-auto py-4 px-6">
        <Dialog>
          <DialogTrigger className="float-right m-5">
            <Button className="float-right" variant={"outline"}>
              Upload New Dataset
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Dataset</DialogTitle>
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
