import { type IncidentSeverityRecommendation } from "@/types/incidents.types";
import { useQuery } from "@tanstack/react-query";
import { getSuggestedIncidentSeverity } from "@/services/incident.service";

export default function useGetSuggestedSeverity({
  title,
  description,
  service,
}: {
  title: string;
  description: string | null;
  service: string | null;
}) {
  return useQuery<IncidentSeverityRecommendation>({
    queryKey: ["suggested-severity", title, description, service],
    queryFn: () =>
      getSuggestedIncidentSeverity({ title, description, service }),
    enabled: false,
    retry: false,
  });
}
