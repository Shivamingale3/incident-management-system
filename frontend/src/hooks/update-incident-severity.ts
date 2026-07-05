import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIncidentSeverity } from "@/services/incident.service";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/app.types";
import type { IncidentSeverityType } from "@/types/incidents.types";

export function useUpdateIncidentSeverity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      incidentId,
      severity,
    }: {
      incidentId: string;
      severity: IncidentSeverityType;
    }) => updateIncidentSeverity(incidentId, severity),
    onSuccess: () => {
      toast.success("Incident severity updated successfully");
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
    onError(error) {
      const errorMsg =
        (error as AxiosError<ApiResponse<unknown>>).response?.data?.message ||
        (error as AxiosError).message ||
        "Something went wrong, Please try again!";
      toast.error(errorMsg);
    },
  });
}
