import Toolbar from "./toolbar";
import IncidentsTable from "./incidents-table";
import PaginationBar from "./pagination-bar";
import { useIncidentFilters } from "@/hooks/use-incident-filters";
import useGetIncidents from "@/hooks/use-get-incidents";

const Incidents = () => {
  const {
    filters,
    setSeverity,
    setStatus,
    setSearchQuery,
    clearFilters,
    pagination,
    setPage,
    setPageSize,
    autoFetchPeriod,
    setAutoFetchPeriod,
    debouncedSearchQuery,
  } = useIncidentFilters();

  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetIncidents(
      {
        status: filters.status,
        severity: filters.severity,
        searchQuery: debouncedSearchQuery || null,
        ...pagination,
      },
      {
        refetchInterval: autoFetchPeriod ? autoFetchPeriod.value * 1000 : false,
      },
    );

  return (
    <main className="px-5 pb-5 flex flex-col items-center gap-5 w-full lg:flex-1 lg:min-h-0">
      <Toolbar
        filters={filters}
        onSeverityChange={setSeverity}
        onStatusChange={setStatus}
        onSearchChange={setSearchQuery}
        onClearFilters={clearFilters}
        autoFetchPeriod={autoFetchPeriod}
        onAutoFetchChange={setAutoFetchPeriod}
        onRefresh={() => refetch()}
        isFetching={isFetching}
      />
      <IncidentsTable
        incidents={data?.data ?? []}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
      />
      <PaginationBar
        currentPage={data?.page ?? pagination.pageNo}
        totalPages={data?.totalPages ?? 1}
        pageSize={pagination.pageSize}
        totalItems={data?.total ?? 0}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        isFetching={isFetching}
      />
    </main>
  );
};

export default Incidents;
