import type { IncidentSeverity } from "@/constants/incidentSererity.constants";
import type { IncidentStatus } from "@/constants/incidentStatus.constants";

export type Incident = {
  id: string;
  title: string;
  description: string;
  service: string;
  severity: IncidentSeverityType;
  status: IncidentStatusType;
  assignee: string;
  createdAt: string;
  updatedAt: string;
};

export type IncidentSeverityType =
  (typeof IncidentSeverity)[keyof typeof IncidentSeverity];

export type IncidentStatusType =
  (typeof IncidentStatus)[keyof typeof IncidentStatus];

export type StatusBadgeProps = {
  status: IncidentStatusType;
  className?: string;
};

export type SeverityBadgeProps = {
  severity: IncidentSeverityType;
  className?: string;
};
