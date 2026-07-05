import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ViewIncidentSkeleton = () => {
  return (
    <DialogContent className="min-w-7xl max-h-[95vh]">
      <DialogHeader>
        <div>
          <DialogTitle className="text-xl font-semibold mb-2">
            <Skeleton className="h-7 w-2/3" />
          </DialogTitle>
          <div className="space-y-1.5 mt-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-start items-center gap-5">
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Status
            </span>
            <Skeleton className="h-9 w-32" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Severity
            </span>
            <Skeleton className="h-9 w-32" />
          </div>
        </div>
      </DialogHeader>
      <div className="max-h-[70vh] overflow-y-auto mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-5 bg-muted/20 rounded-xl border border-border/40 backdrop-blur-sm shadow-sm">
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Service
            </span>
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Assignee
            </span>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full shrink-0" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Created At
            </span>
            <Skeleton className="h-6 w-36" />
          </div>
        </div>
        <div className="w-full space-y-3">
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </DialogContent>
  );
};

export default ViewIncidentSkeleton;
