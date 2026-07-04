import api from "@/lib/axiosInstance";
import type { AddNewIncident } from "@/types/incidents.types";

export const incidentService = {
  async createIncident(payload: AddNewIncident) {
    const response = await api.post("/incidents", payload);
    return response.data;
  },
};
