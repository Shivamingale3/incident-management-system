import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIncident } from "@/services/incident.service";

export function useCreateIncident() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIncident,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
  });
}
