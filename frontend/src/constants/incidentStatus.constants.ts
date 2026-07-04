export const IncidentStatus = {
  OPEN: "OPEN",
  INVESTIGATING: "INVESTIGATING",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  CLOSED: "CLOSED",
} as const;

export const IncidentStatusLabels = {
  [IncidentStatus.OPEN]: "Open",
  [IncidentStatus.INVESTIGATING]: "Investigating",
  [IncidentStatus.IN_PROGRESS]: "In Progress",
  [IncidentStatus.RESOLVED]: "Resolved",
  [IncidentStatus.CLOSED]: "Closed",
} as const;

export const IncidentStatusStyles = {
  [IncidentStatus.OPEN]: "border-slate-500/30 bg-slate-500/10 text-slate-300",

  [IncidentStatus.INVESTIGATING]:
    "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",

  [IncidentStatus.IN_PROGRESS]:
    "border-blue-500/30 bg-blue-500/10 text-blue-400",

  [IncidentStatus.RESOLVED]:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",

  [IncidentStatus.CLOSED]: "border-zinc-600 bg-zinc-800/60 text-zinc-400",
} as const;
