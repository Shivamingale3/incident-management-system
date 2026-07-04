import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, XIcon } from "lucide-react";

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
import {
  DEFAULT_VALUES,
} from "@/constants/create-incident-form.constants";
import incidentIdGenerator from "@/utils/generateIncidentId";
import type { AddNewIncident } from "@/types/incidents.types";

const CreateNewIncident = () => {
  const [open, setOpen] = useState(false);
  const [incidentId, setIncidentId] = useState("");

  const form = useForm<AddNewIncident>({
    resolver: zodResolver(addIncidentValidationSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onSubmit",
  });

  const { mutate, isPending } = useCreateIncident();

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
    form.reset();
    setIncidentId("");
    setOpen(false);
  }, [form]);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        const newId = incidentIdGenerator();
        setIncidentId(newId);
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
          form.reset();
          setIncidentId("");
          setTimeout(() => setOpen(false), 0);
        }
      }
    },
    [form],
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
          form.reset();
          setIncidentId("");
          setTimeout(() => setOpen(false), 0);
        }
      }
    },
    [form],
  );

  const onSubmit = useCallback(
    (data: AddNewIncident) => {
      const payload: AddNewIncident = {
        ...data,
        description: data.description || null,
        service: data.service || null,
        assignee: data.assignee || null,
      };

      mutate(payload, {
        onSuccess: () => {
          toast.success("Incident created successfully.");
          form.reset();
          setIncidentId("");
          setOpen(false);
        },
      });
    },
    [form, mutate],
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
      className="min-w-7xl"
        showCloseButton={false}
        onPointerDownOutside={handlePointerDownOutside}
        onEscapeKeyDown={handleEscapeKeyDown}
        onInteractOutside={(e) => {
          // Prevent Radix from closing the dialog when interacting
          // with portalled Select dropdowns
          const target = (e as CustomEvent<{ originalEvent: Event }>).detail
            ?.originalEvent?.target as HTMLElement | null;
          if (target?.closest("[data-slot='select-content']")) {
            e.preventDefault();
          }
        }}
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
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Incident"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewIncident;
