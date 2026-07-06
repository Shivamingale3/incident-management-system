import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const KpiCardSkeleton = () => {
  return (
    <Card className="p-3 sm:p-4">
      <Skeleton className="w-1/2 h-5 sm:h-6 lg:h-7 mb-2"></Skeleton>
      <div className="flex justify-between items-end">
        <Skeleton className="w-16 h-8 sm:h-9 lg:h-10"></Skeleton>
        <Skeleton className="w-1/3 h-4 sm:h-[18px] lg:h-5"></Skeleton>
      </div>
    </Card>
  );
};

export default KpiCardSkeleton;
