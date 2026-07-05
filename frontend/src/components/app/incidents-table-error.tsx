import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";
import { AxiosError } from "axios";

const IncidentsTableError = ({
  error,
  onRetry,
}: {
  error: Error | null;
  onRetry: () => void;
}) => {
  const errorMessage =
    error instanceof AxiosError && error.response?.data.message
      ? error.response.data.message
      : "Something went wrong, try again!";

  return (
    <TableRow className="pointer-events-none">
      <TableCell colSpan={7} className="h-[50vh]">
        <div className="flex flex-col items-center justify-center gap-3 text-destructive">
          <AlertCircle className="size-10 opacity-60" />
          <div className="text-center">
            <p className="text-base font-medium">Failed to load incidents</p>
            <p className="text-sm opacity-70">{errorMessage}</p>
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
