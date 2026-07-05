import { useMutation, useQueryClient } from "@tanstack/react-query";
import { regenerateIncidentAiInsights } from "@/services/incident.service";
import { toast } from "sonner";
import axios from "axios";
import { type IncidentAiInsights } from "@/types/incidents.types";

export function useRegenerateIncidentAiInsights() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (incidentId: string) =>
      regenerateIncidentAiInsights(incidentId),
    onSuccess: (data: IncidentAiInsights, incidentId) => {
      toast.success("AI insights regenerated successfully.");
      queryClient.setQueryData(["incident-ai-insights", incidentId], data);
      queryClient.invalidateQueries({ queryKey: ["incident", incidentId] });
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
    onError: (error) => {
      const errorMsg =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unexpected error occurred.";
      toast.error(errorMsg);
    },
  });
}
