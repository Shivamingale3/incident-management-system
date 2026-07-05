import api from "@/lib/axiosInstance";
import type { ApiResponse } from "@/types/app.types";
import type {
  AddNewIncident,
  GetIncidentsByFilter,
} from "@/types/incidents.types";

export async function createIncident(payload: AddNewIncident): Promise<void> {
  await api.post("/incident", payload);
}

export async function getIncidentsByFilter(): Promise<GetIncidentsByFilter> {
  const response =
    await api.get<ApiResponse<GetIncidentsByFilter>>("/incident/filter");
  return response.data.data;
}
