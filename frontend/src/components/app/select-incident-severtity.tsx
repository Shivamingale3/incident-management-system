import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IncidentSeverity } from "@/constants/incidentSererity.constants";
import { cn } from "@/lib/utils";
import type { IncidentSeverityType } from "@/types/incidents.types";
import { SeverityBadge } from "./severity-badge";

export const SelectIncidentSeverity = ({
  value,
  onValueChange,
  className,
}: {
  value: IncidentSeverityType;
  onValueChange: (value: IncidentSeverityType) => void;
  className?: string;
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "w-full border-border/50 text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10",
          className,
        )}
      >
        <SelectValue>
          <SeverityBadge severity={value} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-popover shadow-lg">
        {Object.values(IncidentSeverity).map((severity) => (
          <SelectItem
            key={severity}
            value={severity}
            className="cursor-pointer data-[state=checked]:bg-primary/10 data-[state=checked]:font-medium"
          >
            <SeverityBadge severity={severity} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectIncidentSeverity;
