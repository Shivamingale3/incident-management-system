import { formatIncidentCreatedAtToLocale } from "@/utils/dateUtils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { RichTextEditor } from "../ui/rich-text-editor";
import type {
  Incident,
  IncidentSeverityType,
  IncidentStatusType,
} from "@/types/incidents.types";
import SelectIncidentStatus from "./select-incident-status";
import SelectIncidentSeverity from "./select-incident-severtity";
import { useUpdateIncidentSeverity } from "@/hooks/update-incident-severity";
import { useUpdateIncidentStatus } from "@/hooks/update-incident-status";

const ViewIncident = ({
  incident,
  open,
  onClose,
}: {
  incident: Incident;
  open: boolean;
  onClose: () => void;
}) => {
  const {
    mutateAsync: updateIncidentSeverity,
    isPending: isUpdatingIncidentSeverity,
  } = useUpdateIncidentSeverity();
  const {
    mutateAsync: updateIncidentStatus,
    isPending: isUpdatingIncidentStatus,
  } = useUpdateIncidentStatus();

  // const [status, setStatus] = useState<IncidentStatusType>(incident.status);
  // const [severity, setSeverity] = useState<IncidentSeverityType>(
  //   incident.severity,
  // );

  const handleUpdateStatus = async (status: IncidentStatusType) => {
    await updateIncidentStatus({ incidentId: incident.id, status });
  };

  const handleUpdateSeverity = async (severity: IncidentSeverityType) => {
    await updateIncidentSeverity({ incidentId: incident.id, severity });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-7xl max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {incident.title}
          </DialogTitle>
          <DialogDescription className="text-sm font-semibold text-primary">
            {incident.incidentId}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-5 bg-muted/20 rounded-xl border border-border/40 backdrop-blur-sm shadow-sm">
            {incident.service && (
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
            )}
            {incident.assignee && (
              <div className="flex flex-col space-y-1.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Assignee
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {incident.assignee?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-base font-medium text-foreground">
                    {incident.assignee}
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Created At
              </span>
              <span className="text-base font-medium text-foreground">
                {formatIncidentCreatedAtToLocale(incident.createdAt)}
              </span>
            </div>
          </div>
          {incident.description && (
            <RichTextEditor
              value={incident.description}
              onChange={() => {}}
              readOnly
            />
          )}
        </div>
        <DialogFooter className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-border/40">
          <SelectIncidentStatus
            status={incident.status}
            setStatus={handleUpdateStatus}
            disabled={isUpdatingIncidentStatus}
          />
          <SelectIncidentSeverity
            severity={incident.severity}
            setSeverity={handleUpdateSeverity}
            disabled={isUpdatingIncidentSeverity}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewIncident;
