import { Badge } from "@/components/ui/badge";
import { IncidentSeverityStyles } from "@/constants/incidentSererity.constants";
import { cn } from "@/lib/utils";
import type { SeverityBadgeProps } from "@/types/incidents.types";

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-none border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5",
        IncidentSeverityStyles[severity],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-none bg-current shadow-[0_0_5px_currentColor]" />
      {severity}
    </Badge>
  );
}
