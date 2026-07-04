import type { Incident } from "@/types/incidents.types";
import { TableCell, TableRow } from "../ui/table";

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
      <TableCell>{incident.severity}</TableCell>
      <TableCell>{incident.status}</TableCell>
      <TableCell>{incident.assignee}</TableCell>
      <TableCell>{incident.createdAt}</TableCell>
    </TableRow>
  );
};

export default IncidentTableRow;
