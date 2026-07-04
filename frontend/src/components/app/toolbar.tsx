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

import { useState } from "react";
import SelectIncidentSeverity from "./select-incident-severtity";
import SelectIncidentStatus from "./select-incident-status";
import SelectAutoFetch from "./select-auto-fetch";

const Toolbar = () => {
  const [severity, setSeverity] = useState<IncidentSeverityType | null>(null);
  const [status, setStatus] = useState<IncidentStatusType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [autoFetchPeriod, setAutoFetchPeriod] =
    useState<IncidentAutoFetchTiming | null>(null);

  const clearFilters = () => {
    setSeverity(null);
    setStatus(null);
    setSearchQuery(null);
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex justify-center items-center flex-col lg:flex-row lg:gap-5">
        <InputGroup className="w-full lg:w-[300px]">
          <InputGroupInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search incidents by ID or title..."
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <div className="flex justify-center items-center gap-2">
          <SelectIncidentSeverity
            severity={severity}
            setSeverity={setSeverity}
          />
          <SelectIncidentStatus status={status} setStatus={setStatus} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <SelectAutoFetch
          autoFetchPeriod={autoFetchPeriod}
          setAutoFetchPeriod={setAutoFetchPeriod}
        />
        <Button variant="outline" onClick={clearFilters}>
          <X />
          Clear Filters
        </Button>
        <Button>
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
