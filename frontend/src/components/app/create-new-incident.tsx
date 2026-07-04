import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const CreateNewIncident = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex items-center py-5">
          <Plus />
          New Incident
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Incident</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new incident.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewIncident;
