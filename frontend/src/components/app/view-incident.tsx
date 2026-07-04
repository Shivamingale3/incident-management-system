import { Badge } from "../ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
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
      <DialogContent>
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
        <Card>
          <CardHeader>
            <CardTitle> Description:</CardTitle>
          </CardHeader>
          <CardDescription className="px-5 overflow-y-auto">
            <div
              className="w-full prose dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: incident.description,
              }}
            />
          </CardDescription>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ViewIncident;
