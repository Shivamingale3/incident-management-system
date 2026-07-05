import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IncidentStatusType } from "@/types/incidents.types";
import { StatusBadge } from "./status-badge";
import { IncidentStatus } from "@/constants/incidentStatus.constants";

export const SelectIncidentStatus = ({
  status,
  setStatus,
  includeAll = true,
  disabled = false,
}: {
  status: IncidentStatusType | null;
  setStatus: (status: IncidentStatusType | null) => void;
  includeAll?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Select
      value={status ?? (includeAll ? "ALL" : undefined)}
      onValueChange={(val) =>
        setStatus(val === "ALL" ? null : (val as IncidentStatusType))
      }
      disabled={disabled}
    >
      <SelectTrigger className={includeAll ? "w-max" : "w-full"}>
        <SelectValue placeholder={includeAll ? "Status: All" : "Select status"} />
      </SelectTrigger>
      <SelectContent>
        {includeAll && <SelectItem value="ALL">Status: All</SelectItem>}
        {Object.values(IncidentStatus).map((stat) => (
          <SelectItem key={stat} value={stat}>
            <StatusBadge status={stat as IncidentStatusType} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectIncidentStatus;
