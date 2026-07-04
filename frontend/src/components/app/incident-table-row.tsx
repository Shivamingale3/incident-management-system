import type {
  Incident,
  IncidentSeverityType,
  IncidentStatusType,
} from "@/types/incidents.types";
import { TableCell, TableRow } from "../ui/table";
import { SeverityBadge } from "./severity-badge";
import { StatusBadge } from "./status-badge";

const IncidentTableRow = ({
  incident,
  onSelect,
}: {
  incident: Incident;
  onSelect: (incident: Incident) => void;
}) => {
  return (
    <TableRow className="cursor-pointer" onClick={() => onSelect(incident)}>
      <TableCell>{incident.id}</TableCell>
      <TableCell>{incident.title}</TableCell>
      <TableCell>{incident.service}</TableCell>
      <TableCell>
        <SeverityBadge severity={incident.severity as IncidentSeverityType} />
      </TableCell>
      <TableCell>
        <StatusBadge status={incident.status as IncidentStatusType} />
      </TableCell>
      <TableCell>{incident.assignee}</TableCell>
      <TableCell>{incident.createdAt}</TableCell>
    </TableRow>
  );
};

export default IncidentTableRow;
