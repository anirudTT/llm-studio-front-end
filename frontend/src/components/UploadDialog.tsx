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
import { Link } from "lucide-react";

const UploadDialog = () => {
  return (
    <div className="flex justify-between p-8">
      <Dialog>
        <DialogTrigger className="float-right m-5">
          <Button className="float-right" variant="outline">
            <Link className="mr-2" />
            Link Model Weight File
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Path to the file from system </DialogTitle>
          </DialogHeader>
          <FileUploader />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadDialog;
