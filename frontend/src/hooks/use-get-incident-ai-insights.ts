import { useQuery } from "@tanstack/react-query";
import { getIncidentAiInsights } from "@/services/incident.service";
import { type IncidentAiInsights } from "@/types/incidents.types";

export default function useGetIncidentAiInsights(incidentId: string) {
  return useQuery<IncidentAiInsights>({
    queryKey: ["incident-ai-insights", incidentId],
    queryFn: () => getIncidentAiInsights(incidentId),
    enabled: false,
  });
}
