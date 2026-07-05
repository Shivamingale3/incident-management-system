import api from "@/lib/axiosInstance";
import type { ApiResponse } from "@/types/app.types";
import type {
  AddNewIncident,
  GetIncidentsByFilter,
  Incident,
  IncidentQueryParams,
  IncidentSeverityRecommendation,
  IncidentStatusType,
} from "@/types/incidents.types";

export async function createIncident(payload: AddNewIncident): Promise<void> {
  await api.post("/incident", payload);
}

export async function getIncidentsByFilter(
  filters: IncidentQueryParams,
): Promise<GetIncidentsByFilter> {
  const queryParams = new URLSearchParams();

  if (filters.status != null) {
    queryParams.set("status", filters.status);
  }
  if (filters.severity != null) {
    queryParams.set("severity", filters.severity);
  }
  if (filters.searchQuery != null && filters.searchQuery.trim() !== "") {
    queryParams.set("searchQuery", filters.searchQuery);
  }
  if (filters.pageSize != null) {
    queryParams.set("pageSize", filters.pageSize.toString());
  }
  if (filters.pageNo != null) {
    queryParams.set("pageNo", filters.pageNo.toString());
  }

  const response = await api.get<ApiResponse<GetIncidentsByFilter>>(
    "/incident/filter",
    {
      params: queryParams,
    },
  );
  return response.data.data;
}

export async function updateIncidentStatus(
  incidentId: string,
  status: IncidentStatusType,
): Promise<void> {
  await api.patch(`/incident/${incidentId}/status/${status}`);
}

export async function getIncidentById(id: string): Promise<Incident> {
  const response = await api.get<ApiResponse<Incident>>(`/incident/${id}`);
  return response.data.data;
}

export async function getSuggestedIncidentSeverity({
  title,
  description,
  service,
}: {
  title: string;
  description: string | null;
  service: string | null;
}): Promise<IncidentSeverityRecommendation> {
  const body: {
    title?: string;
    description?: string;
    service?: string;
  } = {};
  if (title.trim()) {
    body.title = title;
  }
  if (description?.trim()) {
    body.description = description;
  }
  if (service?.trim()) {
    body.service = service;
  }

  const response = await api.post<ApiResponse<IncidentSeverityRecommendation>>(
    "/ai/incident/suggest-severity",
    body,
  );
  return response.data.data;
}
