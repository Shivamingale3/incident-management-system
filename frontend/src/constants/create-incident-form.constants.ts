import type { AddNewIncident } from "@/types/incidents.types";

export const DEFAULT_VALUES: AddNewIncident = {
  title: "",
  incidentId: "",
  description: null,
  service: null,
  severity: "LOW",
  status: "OPEN",
  assignee: null,
};

export const FIELD_LABELS = {
  title: "Title",
  description: "Description",
  service: "Service",
  assignee: "Assignee",
  severity: "Severity",
  status: "Status",
} as const;

export const FIELD_PLACEHOLDERS = {
  title: "Enter incident title",
  description: "Describe the incident...",
  service: "e.g. API Gateway",
  assignee: "e.g. John Doe",
} as const;
