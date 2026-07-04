import { formatIncidentCreatedAtToLocale } from "@/utils/dateUtils";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { RichTextEditor } from "../ui/rich-text-editor";
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-5 bg-muted/20 rounded-xl border border-border/40 backdrop-blur-sm shadow-sm">
            <div className="flex flex-col space-y-1.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Service
              </span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                <span className="text-base font-medium text-foreground">
                  {incident.service}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Assignee
              </span>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {incident.assignee.charAt(0).toUpperCase()}
                </div>
                <span className="text-base font-medium text-foreground">
                  {incident.assignee}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Created At
              </span>
              <span className="text-base font-medium text-foreground">
                {formatIncidentCreatedAtToLocale(incident.createdAt)}
              </span>
            </div>
          </div>
          <RichTextEditor
            value={incident.description}
            onChange={() => {}}
            readOnly
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewIncident;
