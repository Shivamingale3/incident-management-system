import { getIncidentsByFilter } from "@/services/incident.service";
import type { IncidentQueryParams } from "@/types/incidents.types";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export default function useGetIncidents(
  params: IncidentQueryParams,
  options?: {
    refetchInterval?: number | false;
  },
) {
  return useQuery({
    queryKey: [
      "incidents",
      params.status,
      params.severity,
      params.searchQuery,
      params.pageSize,
      params.pageNo,
    ],
    queryFn: () => getIncidentsByFilter(params),
    placeholderData: keepPreviousData,
    refetchInterval: options?.refetchInterval ?? false,
    staleTime: 30_000,
  });
}
