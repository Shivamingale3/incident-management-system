import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

const IncidentsTableError = ({
  error,
  onRetry,
}: {
  error: Error | null;
  onRetry: () => void;
}) => {
  return (
    <TableRow className="pointer-events-none">
      <TableCell colSpan={7} className="h-[50vh]">
        <div className="flex flex-col items-center justify-center gap-3 text-destructive">
          <AlertCircle className="size-10 opacity-60" />
          <div className="text-center">
            <p className="text-base font-medium">Failed to load incidents</p>
            <p className="text-sm opacity-70">
              {error?.message ?? "An unexpected error occurred"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRetry();
            }}
            className="pointer-events-auto mt-1"
          >
            <RotateCcw className="size-4" />
            Retry
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default IncidentsTableError;
