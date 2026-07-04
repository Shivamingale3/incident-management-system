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
}: {
  status: IncidentStatusType | null;
  setStatus: (status: IncidentStatusType | null) => void;
}) => {
  return (
    <Select
      value={status === null ? "ALL" : status}
      onValueChange={(val) =>
        setStatus(val === "ALL" ? null : (val as IncidentStatusType))
      }
    >
      <SelectTrigger className="w-max">
        <SelectValue placeholder="Status: All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">Status: All</SelectItem>
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
