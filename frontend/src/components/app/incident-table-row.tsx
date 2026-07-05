import type {
  Incident,
  IncidentSeverityType,
  IncidentStatusType,
} from "@/types/incidents.types";
import { TableCell, TableRow } from "../ui/table";
import { SeverityBadge } from "./severity-badge";
import { StatusBadge } from "./status-badge";
import { formatIncidentCreatedAtToLocale } from "@/utils/dateUtils";
import { useState } from "react";
import ViewIncidentDialog from "./view-incident-dialog";

const IncidentTableRow = ({ incident }: { incident: Incident }) => {
  const [viewIncident, setViewIncident] = useState<boolean>(false);
  return (
    <>
      <TableRow className="cursor-pointer" onClick={() => setViewIncident(true)}>
        <TableCell>{incident.incidentId}</TableCell>
        <TableCell>{incident.title}</TableCell>
        <TableCell>{incident.service ?? "-"}</TableCell>
        <TableCell>
          <SeverityBadge severity={incident.severity as IncidentSeverityType} />
        </TableCell>
        <TableCell>
          <StatusBadge status={incident.status as IncidentStatusType} />
        </TableCell>
        <TableCell>{incident.assignee ?? "-"}</TableCell>
        <TableCell>
          {formatIncidentCreatedAtToLocale(incident.createdAt)}
        </TableCell>
      </TableRow>
      {viewIncident && (
        <ViewIncidentDialog
          incidentId={incident.id}
          open={viewIncident}
          onClose={setViewIncident}
        />
      )}
    </>
  );
};

export default IncidentTableRow;
