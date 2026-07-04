import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { Incident } from "@/types/incidents.types";

const ViewIncident = ({
  incident,
  open,
  onClose,
}: {
  incident: Incident;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-7xl max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-sm text-primary font-semibold">
            {incident.id}
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <p className="text-xl text-primary-foreground font-bold">
              {incident.title}
            </p>
            <div className="flex items-center gap-2">
              <Badge>{incident.severity}</Badge>
              <Badge>{incident.status}</Badge>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Description:</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewIncident;
