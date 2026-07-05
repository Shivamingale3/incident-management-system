import {
  type IncidentSeverityRecommendation,
  type SuggestSeverityParams,
} from "@/types/incidents.types";
import { useQuery } from "@tanstack/react-query";
import { getSuggestedIncidentSeverity } from "@/services/incident.service";

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
