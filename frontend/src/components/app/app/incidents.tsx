import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Toolbar from "./toolbar";
import { Card } from "@/components/ui/card";

const Incidents = () => {
  return (
    <main className="p-5 flex flex-col justify-center items-center gap-5 w-full">
      <Toolbar />
      <Card className="p-0! w-full">
        <Table>
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
          <TableBody>
            <TableRow>
              <TableCell>INC-2026-001</TableCell>
              <TableCell>Database Service Down</TableCell>
              <TableCell>Database Service</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Investigating</TableCell>
              <TableCell>Riya</TableCell>
              <TableCell>2026-01-01 10:00:00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </main>
  );
};

export default Incidents;
