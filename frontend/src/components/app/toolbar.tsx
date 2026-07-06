import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { RefreshCcw, Search, X } from "lucide-react";
import type {
  IncidentAutoFetchTiming,
  IncidentSeverityType,
  IncidentStatusType,
} from "@/types/incidents.types";

import SelectIncidentSeverity from "./select-incident-severtity";
import SelectIncidentStatus from "./select-incident-status";
import SelectAutoFetch from "./select-auto-fetch";

type ToolbarProps = {
  filters: {
    severity: IncidentSeverityType | null;
    status: IncidentStatusType | null;
    searchQuery: string;
  };
  onSeverityChange: (severity: IncidentSeverityType | null) => void;
  onStatusChange: (status: IncidentStatusType | null) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  autoFetchPeriod: IncidentAutoFetchTiming | null;
  onAutoFetchChange: (period: IncidentAutoFetchTiming | null) => void;
  onRefresh: () => void;
  isFetching: boolean;
};

const Toolbar = ({
  filters,
  onSeverityChange,
  onStatusChange,
  onSearchChange,
  onClearFilters,
  autoFetchPeriod,
  onAutoFetchChange,
  onRefresh,
  isFetching,
}: ToolbarProps) => {
  const hasActiveFilters =
    filters.severity !== null ||
    filters.status !== null ||
    filters.searchQuery !== "";

  return (
    <div className="w-full flex flex-wrap justify-between items-center gap-y-3">
      <div className="w-full lg:w-auto flex justify-center items-center flex-col lg:flex-row gap-5">
        <InputGroup className="w-full lg:w-[300px] flex ">
          <InputGroupInput
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search incidents by ID or title..."
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <SelectIncidentSeverity
            severity={filters.severity}
            setSeverity={onSeverityChange}
          />
          <SelectIncidentStatus
            status={filters.status}
            setStatus={onStatusChange}
          />
        </div>
      </div>
      <div className="w-full lg:w-auto flex justify-center lg:justify-end items-center gap-2">
        <SelectAutoFetch
          autoFetchPeriod={autoFetchPeriod}
          setAutoFetchPeriod={onAutoFetchChange}
        />
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            aria-label="Clear Filters"
          >
            <X />
            <span className="hidden sm:inline">Clear Filters</span>
          </Button>
        )}
        <Button onClick={onRefresh} disabled={isFetching} aria-label="Refresh">
          <RefreshCcw
            className={`transition-transform ${isFetching ? "animate-spin" : ""}`}
          />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
