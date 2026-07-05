import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const SuggestedSeveritySkeleton = () => {
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="flex items-center gap-2 pt-4">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground animate-pulse">
          Analyzing incident data...
        </span>
      </div>
    </div>
  );
};

export default SuggestedSeveritySkeleton;
