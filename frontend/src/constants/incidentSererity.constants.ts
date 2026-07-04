export const IncidentSeverity = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export const IncidentSeverityStyles = {
  [IncidentSeverity.LOW]: "border-blue-500/30 bg-blue-500/10 text-blue-400",

  [IncidentSeverity.MEDIUM]:
    "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",

  [IncidentSeverity.HIGH]:
    "border-orange-500/30 bg-orange-500/10 text-orange-400",

  [IncidentSeverity.CRITICAL]: "border-red-500/30 bg-red-500/10 text-red-400",
} as const;
