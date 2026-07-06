import { TableCell, TableRow } from "@/components/ui/table";

const SkeletonCell = ({
  className = "",
  cellClassName = "",
}: {
  className?: string;
  cellClassName?: string;
}) => (
  <TableCell className={`h-[5vh] ${cellClassName}`}>
    <div className={`h-4 rounded-md bg-muted animate-pulse ${className}`} />
  </TableCell>
);

const IncidentsTableSkeleton = ({ rows = 10 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={`skeleton-${index}`} className="pointer-events-none">
          <SkeletonCell className="w-24" />
          <SkeletonCell className="w-48" />
          <SkeletonCell className="w-28" cellClassName="hidden md:table-cell" />
          <SkeletonCell className="w-20" />
          <SkeletonCell className="w-24" />
          <SkeletonCell className="w-20" cellClassName="hidden md:table-cell" />
          <SkeletonCell className="w-32" cellClassName="hidden sm:table-cell" />
        </TableRow>
      ))}
    </>
  );
};

export default IncidentsTableSkeleton;
