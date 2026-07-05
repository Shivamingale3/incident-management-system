import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { IncidentStatusType } from "@/types/incidents.types";
import { useUpdateIncidentStatus } from "@/hooks/update-incident-status";
import useGetIncidentById from "@/hooks/use-get-incident-by-id";
import ViewIncidentSkeleton from "./skeletons/view-incident-skeleton";
import ViewIncident from "./view-incident";
import type { Dispatch, SetStateAction } from "react";

const ViewIncidentDialog = ({
  incidentId,
  open,
  onClose,
}: {
  incidentId: string;
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    mutateAsync: updateIncidentStatus,
    isPending: isUpdatingIncidentStatus,
  } = useUpdateIncidentStatus();

  const {
    data: incident,
    isLoading: loadingIncident,
    error: incidentFetchError,
  } = useGetIncidentById(incidentId);

  const handleUpdateStatus = async (status: IncidentStatusType) => {
    if (!incident) return;
    await updateIncidentStatus({ incidentId: incident.id, status });
  };

  return (
    <Dialog open={open} onOpenChange={(state) => onClose(state)}>
      {loadingIncident ? (
        <ViewIncidentSkeleton />
      ) : incident ? (
        <ViewIncident
          incident={incident}
          handleUpdateStatus={handleUpdateStatus}
          isUpdatingIncidentStatus={isUpdatingIncidentStatus}
        />
      ) : incidentFetchError ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Failed to load incident.</DialogTitle>
            <DialogDescription>
              Please try again by refreshing the page.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Incident not found</DialogTitle>
            <DialogDescription>
              The incident you are looking for does not exist.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ViewIncidentDialog;
