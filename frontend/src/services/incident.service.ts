import api from "@/lib/axiosInstance";
import type { ApiResponse } from "@/types/app.types";
import type {
  AddNewIncident,
  GetIncidentsByFilter,
  IncidentQueryParams,
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
