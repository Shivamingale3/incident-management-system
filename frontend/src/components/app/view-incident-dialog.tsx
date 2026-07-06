import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Sheet, SheetContent } from "../ui/sheet";
import type { IncidentStatusType } from "@/types/incidents.types";
import { useUpdateIncidentStatus } from "@/hooks/use-update-incident-status";
import useGetIncidentById from "@/hooks/use-get-incident-by-id";
import { useMediaQuery } from "@/hooks/use-media-query";
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
  const isDesktop = useMediaQuery("(min-width: 768px)");
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

  const fallbackNode = (title: string, description: string) => (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(state) => onClose(state)}>
        {loadingIncident ? (
          <ViewIncidentSkeleton isDesktop={true} />
        ) : incident ? (
          <ViewIncident
            incident={incident}
            handleUpdateStatus={handleUpdateStatus}
            isUpdatingIncidentStatus={isUpdatingIncidentStatus}
            isDesktop={true}
          />
        ) : incidentFetchError ? (
          <DialogContent>
            {fallbackNode(
              "Failed to load incident.",
              "Please try again by refreshing the page.",
            )}
          </DialogContent>
        ) : (
          <DialogContent>
            {fallbackNode(
              "Incident not found",
              "The incident you are looking for does not exist.",
            )}
          </DialogContent>
        )}
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={(state) => onClose(state)}>
      {loadingIncident ? (
        <ViewIncidentSkeleton isDesktop={false} />
      ) : incident ? (
        <ViewIncident
          incident={incident}
          handleUpdateStatus={handleUpdateStatus}
          isUpdatingIncidentStatus={isUpdatingIncidentStatus}
          isDesktop={false}
        />
      ) : incidentFetchError ? (
        <SheetContent
          side="bottom"
          showCloseButton={true}
          className="flex max-h-[90vh] flex-col gap-4 p-4"
        >
          {fallbackNode(
            "Failed to load incident.",
            "Please try again by refreshing the page.",
          )}
        </SheetContent>
      ) : (
        <SheetContent
          side="bottom"
          showCloseButton={true}
          className="flex max-h-[90vh] flex-col gap-4 p-4"
        >
          {fallbackNode(
            "Incident not found",
            "The incident you are looking for does not exist.",
          )}
        </SheetContent>
      )}
    </Sheet>
  );
};

export default ViewIncidentDialog;
