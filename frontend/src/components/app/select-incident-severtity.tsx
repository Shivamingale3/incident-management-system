import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IncidentSeverity } from "@/constants/incidentSererity.constants";
import type { IncidentSeverityType } from "@/types/incidents.types";
import { SeverityBadge } from "./severity-badge";

export const SelectIncidentSeverity = ({
  severity,
  setSeverity,
  includeAll = true,
  disabled = false,
}: {
  severity: IncidentSeverityType | null;
  setSeverity: (severity: IncidentSeverityType | null) => void;
  includeAll?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Select
      value={severity ?? (includeAll ? "ALL" : undefined)}
      onValueChange={(val) =>
        setSeverity(val === "ALL" ? null : (val as IncidentSeverityType))
      }
      disabled={disabled}
    >
      <SelectTrigger className={includeAll ? "w-max" : "w-full"}>
        <SelectValue
          placeholder={includeAll ? "Severity: All" : "Select severity"}
        />
      </SelectTrigger>
      <SelectContent>
        {includeAll && <SelectItem value="ALL">Severity: All</SelectItem>}
        {Object.values(IncidentSeverity).map((sev) => (
          <SelectItem key={sev} value={sev}>
            <SeverityBadge severity={sev as IncidentSeverityType} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectIncidentSeverity;
