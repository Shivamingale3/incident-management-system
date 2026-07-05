import type { Incident, IncidentStatusType } from "@/types/incidents.types";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  formatIncidentCreatedAt,
  formatIncidentCreatedAtToLocale,
} from "@/utils/dateUtils";
import SelectIncidentStatus from "./select-incident-status";
import { RichTextEditor } from "../ui/rich-text-editor";
import { SeverityBadge } from "./severity-badge";
import { IncidentStatusStyles } from "@/constants/incidentStatus.constants";

const ViewIncident = ({
  incident,
  handleUpdateStatus,
  isUpdatingIncidentStatus,
}: {
  incident: Incident;
  handleUpdateStatus: (status: IncidentStatusType) => Promise<void>;
  isUpdatingIncidentStatus: boolean;
}) => {
  return (
    <DialogContent className="min-w-7xl max-h-[95vh]">
      <DialogHeader className="flex flex-row justify-between items-start">
        <div>
          <DialogTitle className="text-xl font-semibold">
            {incident.title}
          </DialogTitle>
          <DialogDescription className="text-sm font-semibold text-primary">
            {incident.incidentId}
          </DialogDescription>
          <DialogDescription className="text-sm font-medium text-muted-foreground">
            {formatIncidentCreatedAt(incident.createdAt)}
          </DialogDescription>
          <SeverityBadge severity={incident.severity} />
        </div>
        <div
          className={`mr-10 border-2 ${IncidentStatusStyles[incident.status]} `}
        >
          <SelectIncidentStatus
            status={incident.status}
            setStatus={handleUpdateStatus}
            disabled={isUpdatingIncidentStatus}
          />
        </div>
      </DialogHeader>
      <div className="max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-5 bg-muted/20 rounded-none border border-border/40 backdrop-blur-sm shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Service
            </span>
            <div className="flex items-center gap-2">
              {incident.service ? (
                <span className="text-base font-medium text-foreground">
                  {incident.service}
                </span>
              ) : (
                <span className="text-base font-medium text-muted-foreground">
                  -
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Assignee
            </span>
            {incident.assignee ? (
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {incident.assignee?.charAt(0).toUpperCase()}
                </div>
                <span className="text-base font-medium text-foreground">
                  {incident.assignee}
                </span>
              </div>
            ) : (
              <span className="text-base font-medium text-foreground">-</span>
            )}
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
        {incident.description && (
          <RichTextEditor
            value={incident.description}
            onChange={() => {}}
            readOnly
          />
        )}
      </div>
    </DialogContent>
  );
};

export default ViewIncident;
