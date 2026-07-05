import { useState, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoaderCircle, Plus, XIcon } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { addIncidentValidationSchema } from "@/validations/incident.validation";
import { useCreateIncident } from "@/hooks/use-create-incident";
import { IncidentFormFields } from "@/components/app/incident-form-fields";
import { DEFAULT_VALUES } from "@/constants/create-incident-form.constants";
import incidentIdGenerator from "@/utils/generateIncidentId";
import type { AddNewIncident } from "@/types/incidents.types";

const CreateNewIncident = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<AddNewIncident>({
    resolver: zodResolver(addIncidentValidationSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onSubmit",
  });

  const { mutate, isPending } = useCreateIncident();

  // Single source of truth: read incidentId from form state, not separate useState
  const incidentId = useWatch({ control: form.control, name: "incidentId" });

  /**
   * Resets form state and closes the dialog.
   * `useTimeout` is needed for handlers triggered by Radix pointer/escape events
   * to avoid race conditions with Radix's own close logic.
   */
  const resetAndClose = useCallback(
    (useTimeout = false) => {
      form.reset();
      if (useTimeout) {
        setTimeout(() => setOpen(false), 0);
      } else {
        setOpen(false);
      }
    },
    [form],
  );

  const handleClose = useCallback(() => {
    if (form.formState.isDirty) {
      if (
        !window.confirm(
          "You have unsaved changes. Are you sure you want to discard them?",
        )
      ) {
        return;
      }
    }
    resetAndClose();
  }, [form, resetAndClose]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        const newId = incidentIdGenerator();
        form.reset({ ...DEFAULT_VALUES, incidentId: newId });
        setOpen(true);
      } else {
        handleClose();
      }
    },
    [form, handleClose],
  );

  const handlePointerDownOutside = useCallback(
    (e: CustomEvent<{ originalEvent: PointerEvent }>) => {
      // Ignore clicks that land inside a Radix Select portal —
      // they render outside the Dialog DOM, so Radix fires
      // pointerDownOutside, but they're not really "outside" for us.
      const target = e.detail.originalEvent.target as HTMLElement | null;
      if (target?.closest("[data-slot='select-content']")) {
        e.preventDefault();
        return;
      }

      if (form.formState.isDirty) {
        e.preventDefault();
        if (
          window.confirm(
            "You have unsaved changes. Are you sure you want to discard them?",
          )
        ) {
          resetAndClose(true);
        }
      }
    },
    [form, resetAndClose],
  );

  const handleEscapeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (form.formState.isDirty) {
        e.preventDefault();
        if (
          window.confirm(
            "You have unsaved changes. Are you sure you want to discard them?",
          )
        ) {
          resetAndClose(true);
        }
      }
    },
    [form, resetAndClose],
  );

  const handleInteractOutside = useCallback(
    (e: CustomEvent<{ originalEvent: Event }>) => {
      // Prevent Radix from closing the dialog when interacting
      // with portalled Select dropdowns
      const target = (e as CustomEvent<{ originalEvent: Event }>).detail
        ?.originalEvent?.target as HTMLElement | null;
      if (target?.closest("[data-slot='select-content']")) {
        e.preventDefault();
      }
    },
    [],
  );

  const onSubmit = useCallback(
    (data: AddNewIncident) => {
      // Guard against rapid double-submission before React re-renders
      if (isPending) return;

      mutate(data, {
        onSuccess: () => {
          toast.success("Incident created successfully.");
          resetAndClose();
        },
        onError: (error) => {
          // Handle duplicate incident ID (409 Conflict)
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            const newId = incidentIdGenerator();
            form.setValue("incidentId", newId);
            toast.error(
              "Incident ID already exists. A new ID has been generated — please try again.",
            );
            return;
          }
          // For other errors, the axios interceptor already shows a toast.
          // We just keep the form open so the user can retry.
        },
      });
    },
    [form, mutate, isPending, resetAndClose],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center py-5">
          <Plus />
          New Incident
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-5xl"
        showCloseButton={false}
        onPointerDownOutside={handlePointerDownOutside}
        onEscapeKeyDown={handleEscapeKeyDown}
        onInteractOutside={handleInteractOutside}
      >
        <div className="flex items-center justify-between">
          <DialogHeader>
            <DialogTitle>Create New Incident</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new incident.
            </DialogDescription>
          </DialogHeader>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleClose}
            className="shrink-0"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <IncidentFormFields
              incidentId={incidentId}
              isPending={isPending}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Incident"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateNewIncident };
export default CreateNewIncident;
