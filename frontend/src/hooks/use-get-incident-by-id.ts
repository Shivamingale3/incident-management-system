import { getIncidentById } from "@/services/incident.service";
import { useQuery } from "@tanstack/react-query";

export default function useGetIncidentById(id: string) {
  return useQuery({
    queryKey: ["incident", id],
    queryFn: () => getIncidentById(id),
  });
}
