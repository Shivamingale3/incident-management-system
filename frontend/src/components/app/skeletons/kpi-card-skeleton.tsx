import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const KpiCardSkeleton = () => {
  return (
    <Card className="p-4">
      <Skeleton className="w-1/2 h-7 mb-2"></Skeleton>
      <div className="flex justify-between items-end">
        <Skeleton className="w-16 h-10"></Skeleton>
        <Skeleton className="w-1/3 h-5"></Skeleton>
      </div>
    </Card>
  );
};

export default KpiCardSkeleton;
