import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { IncidentStatusType } from "@/types/incidents.types";
import { StatusBadge } from "./status-badge";
import { IncidentStatus } from "@/constants/incidentStatus.constants";

export const SelectIncidentStatus = ({
  value,
  onValueChange,
  className,
}: {
  value: IncidentStatusType;
  onValueChange: (value: IncidentStatusType) => void;
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
          <StatusBadge status={value} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-popover shadow-lg">
        {Object.values(IncidentStatus).map((status) => (
          <SelectItem
            key={status}
            value={status}
            className="cursor-pointer data-[state=checked]:bg-primary/10 data-[state=checked]:font-medium"
          >
            <StatusBadge status={value} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectIncidentStatus;
