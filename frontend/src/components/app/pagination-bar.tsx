import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAGE_SIZE_OPTIONS } from "@/constants/pagination.constants";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  isFetching: boolean;
};

/**
 * Generates an array of page numbers to display, with ellipsis represented as -1.
 * Example: [1, -1, 4, 5, 6, -1, 10]
 */
function getPageNumbers(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: number[] = [];

  // Always show first page
  pages.push(1);

  if (currentPage > 3) {
    pages.push(-1); // left ellipsis
  }

  // Pages around current
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push(-1); // right ellipsis
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

const PaginationBar = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  isFetching,
}: PaginationBarProps) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div
      className={`flex w-full items-center justify-between gap-4 text-sm transition-opacity duration-200 ${
        isFetching ? "opacity-70" : "opacity-100"
      }`}
    >
      {/* Left: Item count */}
      <p className="text-muted-foreground whitespace-nowrap">
        Showing{" "}
        <span className="font-medium text-foreground">
          {startItem}–{endItem}
        </span>{" "}
        of <span className="font-medium text-foreground">{totalItems}</span>{" "}
        incidents
      </p>

      {/* Center: Page buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          aria-label="First page"
        >
          <ChevronsLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>

        {pageNumbers.map((page, index) =>
          page === -1 ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 text-muted-foreground select-none"
            >
              …
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              className="size-8"
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          aria-label="Last page"
        >
          <ChevronsRight className="size-4" />
        </Button>
      </div>

      {/* Right: Page size selector */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground whitespace-nowrap">
          Rows per page
        </span>
        <Select
          value={pageSize.toString()}
          onValueChange={(val) => onPageSizeChange(Number(val))}
        >
          <SelectTrigger className="w-[70px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PaginationBar;
