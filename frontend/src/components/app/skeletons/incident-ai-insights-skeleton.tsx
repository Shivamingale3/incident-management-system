import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const IncidentAiInsightsSkeleton = () => {
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>

      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-40" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-2 w-2 rounded-full shrink-0" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-2 w-2 rounded-full shrink-0" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-2 w-2 rounded-full shrink-0" />
          <Skeleton className="h-3 w-4/5" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-2 w-2 rounded-full shrink-0" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground animate-pulse">
          Analyzing incident insights...
        </span>
      </div>
    </div>
  );
};

export default IncidentAiInsightsSkeleton;
