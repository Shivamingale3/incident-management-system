import { type IncidentSeverityRecommendation } from "@/types/incidents.types";
import { useQuery } from "@tanstack/react-query";
import { getSuggestedIncidentSeverity } from "@/services/incident.service";

type SuggestSeverityParams = {
  title: string;
  description: string | null;
  service: string | null;
};

export default function useGetSuggestedSeverity(
  getParams: () => SuggestSeverityParams,
) {
  return useQuery<IncidentSeverityRecommendation>({
    queryKey: ["suggested-severity"],
    queryFn: () => getSuggestedIncidentSeverity(getParams()),
    enabled: false,
    retry: false,
  });
}
