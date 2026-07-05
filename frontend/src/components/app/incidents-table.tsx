import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import IncidentTableRow from "./incident-table-row";
import IncidentsTableSkeleton from "./skeletons/incidents-table-skeleton";
import IncidentsTableEmpty from "./empty/incidents-table-empty";
import IncidentsTableError from "./errors/incidents-table-error";
import type { IncidentsTableProps } from "@/types/incidents.types";

const IncidentsTable = ({
  incidents,
  isLoading,
  isError,
  error,
  onRetry,
}: IncidentsTableProps) => {
  const renderBody = () => {
    if (isLoading && incidents.length === 0) {
      return <IncidentsTableSkeleton />;
    }

    if (isError) {
      return <IncidentsTableError error={error} onRetry={onRetry} />;
    }

    if (!isLoading && incidents.length === 0) {
      return <IncidentsTableEmpty />;
    }

    return incidents.map((incident) => (
      <IncidentTableRow incident={incident} key={incident.id} />
    ));
  };

  return (
    <Card className="p-0! w-full flex-1 min-h-0 overflow-auto">
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
        <TableBody className="bg-background">{renderBody()}</TableBody>
      </Table>
    </Card>
  );
};

export default IncidentsTable;
