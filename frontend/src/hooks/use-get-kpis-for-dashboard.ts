import { type KPIItem } from "@/types/incidents.types";
import { useQuery } from "@tanstack/react-query";
import { getKpisForDashboard } from "@/services/incident.service";

export default function useGetKpisForDashboard() {
  return useQuery<KPIItem[]>({
    queryKey: ["dashboard-kpi"],
    queryFn: () => getKpisForDashboard(),
  });
}
