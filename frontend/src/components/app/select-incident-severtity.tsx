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
}: {
  severity: IncidentSeverityType | null;
  setSeverity: (severity: IncidentSeverityType | null) => void;
}) => {
  return (
    <Select
      value={severity === null ? "ALL" : severity}
      onValueChange={(val) =>
        setSeverity(val === "ALL" ? null : (val as IncidentSeverityType))
      }
    >
      <SelectTrigger className="w-max">
        <SelectValue placeholder="Severity: All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">Severity: All</SelectItem>
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
