import { TableCell, TableRow } from "@/components/ui/table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { GalleryThumbnailsIcon } from "lucide-react";

const IncidentsTableEmpty = () => {
  return (
    <TableRow className="pointer-events-none">
      <TableCell colSpan={7} className="h-[50vh]">
        <Empty className="h-full flex flex-col justify-center">
          <EmptyHeader className="gap-2">
            <EmptyMedia>
              <GalleryThumbnailsIcon className="w-12 h-12" />
            </EmptyMedia>
            <EmptyTitle className="text-xl">No Incidents Yet</EmptyTitle>
            <EmptyDescription className="text-lg">
              No Incidents found everything good. Click on top-right Create Incident
              button to create an incident.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </TableCell>
    </TableRow>
  );
};

export default IncidentsTableEmpty;
