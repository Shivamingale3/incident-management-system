import { useCallback, useState } from "react";
import type {
  IncidentAutoFetchTiming,
  IncidentSeverityType,
  IncidentStatusType,
} from "@/types/incidents.types";
import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
} from "@/constants/pagination.constants";
import { useDebounce } from "./use-debounce";

export function useIncidentFilters() {
  // Filter state
  const [severity, setSeverity] = useState<IncidentSeverityType | null>(null);
  const [status, setStatus] = useState<IncidentStatusType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Pagination state
  const [pageNo, setPageNo] = useState(DEFAULT_PAGE_NO);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  // Auto-refresh state
  const [autoFetchPeriod, setAutoFetchPeriod] =
    useState<IncidentAutoFetchTiming | null>(null);

  // Debounced search (300ms)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Handlers that reset page to 1 on filter changes
  const handleSeverityChange = useCallback(
    (newSeverity: IncidentSeverityType | null) => {
      setSeverity(newSeverity);
      setPageNo(DEFAULT_PAGE_NO);
    },
    [],
  );

  const handleStatusChange = useCallback(
    (newStatus: IncidentStatusType | null) => {
      setStatus(newStatus);
      setPageNo(DEFAULT_PAGE_NO);
    },
    [],
  );

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setPageNo(DEFAULT_PAGE_NO);
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setPageNo(DEFAULT_PAGE_NO);
  }, []);

  const clearFilters = useCallback(() => {
    setSeverity(null);
    setStatus(null);
    setSearchQuery("");
    setPageNo(DEFAULT_PAGE_NO);
  }, []);

  return {
    // Filter state
    filters: {
      severity,
      status,
      searchQuery,
    },
    setSeverity: handleSeverityChange,
    setStatus: handleStatusChange,
    setSearchQuery: handleSearchChange,
    clearFilters,

    // Pagination state
    pagination: {
      pageNo,
      pageSize,
    },
    setPage: setPageNo,
    setPageSize: handlePageSizeChange,

    // Auto-refresh
    autoFetchPeriod,
    setAutoFetchPeriod,

    // Debounced search for query key
    debouncedSearchQuery,
  };
}
