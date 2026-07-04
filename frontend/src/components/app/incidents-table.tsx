import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { incidents } from "@/constants/tavleData";
import IncidentTableRow from "./incident-table-row";
import type { Incident } from "@/types/incidents.types";

const IncidentsTable = ({
  onSelectIncident,
}: {
  onSelectIncident: (incident: Incident) => void;
}) => {
  return (
    <Card className="p-0! w-full flex-1 min-h-0 overflow-hidden">
      <Table className="[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10 [&_thead]:bg-card text-base">
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-background">
          {incidents.map((incident) => (
            <IncidentTableRow
              incident={incident}
              key={incident.id}
              onSelect={onSelectIncident}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default IncidentsTable;
