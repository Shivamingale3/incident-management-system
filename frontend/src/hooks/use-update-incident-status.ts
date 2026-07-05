import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIncidentStatus } from "@/services/incident.service";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/app.types";
import type { IncidentStatusType } from "@/types/incidents.types";

export function useUpdateIncidentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      incidentId,
      status,
    }: {
      incidentId: string;
      status: IncidentStatusType;
    }) => updateIncidentStatus(incidentId, status),
    onSuccess: (_, variables) => {
      toast.success("Incident status updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["incidents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["incident", variables.incidentId],
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard-kpi"] });
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
