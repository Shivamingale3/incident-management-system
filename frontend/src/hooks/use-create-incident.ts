import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIncident } from "@/services/incident.service";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/app.types";

export function useCreateIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIncident,
    onSuccess: () => {
      toast.success("Incident created successfully");
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
