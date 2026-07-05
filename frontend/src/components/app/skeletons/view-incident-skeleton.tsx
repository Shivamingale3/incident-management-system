import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const ViewIncidentSkeleton = () => {
  return (
    <DialogContent className="min-w-7xl max-h-[95vh]">
      <DialogHeader>
        <div>
          <DialogTitle className="text-xl font-semibold mb-2">
            <div className="h-7 w-2/3 bg-muted animate-pulse rounded-md" />
          </DialogTitle>
          <div className="space-y-1.5 mt-2">
            <div className="h-4 w-1/4 bg-muted animate-pulse rounded-md" />
            <div className="h-4 w-1/3 bg-muted animate-pulse rounded-md" />
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-start items-center gap-5">
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Status
            </span>
            <div className="h-9 w-32 bg-muted animate-pulse rounded-md" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Severity
            </span>
            <div className="h-9 w-32 bg-muted animate-pulse rounded-md" />
          </div>
        </div>
      </DialogHeader>
      <div className="max-h-[70vh] overflow-y-auto mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-5 bg-muted/20 rounded-xl border border-border/40 backdrop-blur-sm shadow-sm">
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Service
            </span>
            <div className="h-6 w-24 bg-muted animate-pulse rounded-md" />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Assignee
            </span>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
              <div className="h-6 w-28 bg-muted animate-pulse rounded-md" />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Created At
            </span>
            <div className="h-6 w-36 bg-muted animate-pulse rounded-md" />
          </div>
        </div>
        <div className="w-full space-y-3">
          <div className="h-8 w-32 bg-muted animate-pulse rounded-md mb-2" />
          <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-11/12 bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-4/5 bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md" />
        </div>
      </div>
    </DialogContent>
  );
};

export default ViewIncidentSkeleton;
