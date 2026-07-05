import type { IncidentSeverity } from "@/constants/incidentSererity.constants";
import type { IncidentStatus } from "@/constants/incidentStatus.constants";
import type { getIncidentsByFilterValidationSchema } from "@/validations/getIncidentFilters.schema";
import type { addIncidentValidationSchema } from "@/validations/incident.validation";
import type z from "zod";

export type Incident = {
  id: string;
  incidentId: string;
  title: string;
  description: string | null;
  service: string | null;
  severity: IncidentSeverityType;
  status: IncidentStatusType;
  assignee: string | null;
  summary: string | null;
  recommendation: string | null;
  rootCause: string | null;
  createdAt: string;
  updatedAt: string;
};

export type IncidentAutoFetchTiming = { label: string; value: number };

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

export type AddNewIncident = z.infer<typeof addIncidentValidationSchema>;

export type GetIncidentsByFilter = {
  data: Incident[];
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
};

export type GetIncidentsByFilterParams = z.infer<
  typeof getIncidentsByFilterValidationSchema
>;

/** Frontend-specific query params — uses native numbers, not string transforms */
export type IncidentQueryParams = {
  status?: IncidentStatusType | null;
  severity?: IncidentSeverityType | null;
  searchQuery?: string | null;
  pageSize: number;
  pageNo: number;
};

/** Pagination metadata returned by the API */
export type PaginationMeta = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
};

export type IncidentsTableProps = {
  incidents: Incident[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onRetry: () => void;
};

export type IncidentSeverityRecommendation = {
  recommendedSeverity: IncidentSeverityType;
  reasons: string[];
};
