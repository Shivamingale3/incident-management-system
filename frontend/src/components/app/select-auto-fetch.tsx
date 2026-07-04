import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AutoFetchPeriods } from "@/constants/incident.constants";
import { type IncidentAutoFetchTiming } from "@/types/incidents.types";

const SelectAutoFetch = ({
  autoFetchPeriod,
  setAutoFetchPeriod,
}: {
  autoFetchPeriod: IncidentAutoFetchTiming | null;
  setAutoFetchPeriod: (period: IncidentAutoFetchTiming | null) => void;
}) => {
  return (
    <Select
      value={
        autoFetchPeriod === null ? "OFF" : autoFetchPeriod.value.toString()
      }
      onValueChange={(val) => {
        if (val === "OFF") {
          setAutoFetchPeriod(null);
        } else {
          const selected = AutoFetchPeriods.find(
            (p) => p.value.toString() === val,
          );
          if (selected) setAutoFetchPeriod(selected);
        }
      }}
    >
      <SelectTrigger className="w-max">
        Auto-Refresh: <SelectValue placeholder="Auto-Refresh: OFF" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="OFF">OFF</SelectItem>
        {AutoFetchPeriods.map((period) => (
          <SelectItem key={period.label} value={period.value.toString()}>
            {period.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectAutoFetch;
