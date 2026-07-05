import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectIncidentSeverity } from "@/components/app/select-incident-severtity";
import { SelectIncidentStatus } from "@/components/app/select-incident-status";
import {
  FIELD_LABELS,
  FIELD_PLACEHOLDERS,
} from "@/constants/create-incident-form.constants";
import type { IncidentFormFieldsProps } from "@/types/create-incident-form.types";
import type {
  AddNewIncident,
  IncidentSeverityType,
  IncidentStatusType,
} from "@/types/incidents.types";

function IncidentIdBanner({ incidentId }: { incidentId: string }) {
  return (
    <div className="flex items-center gap-3 rounded-none border border-border bg-muted/30 px-4 py-3">
      <span className="text-xs text-muted-foreground">Incident ID</span>
      <Badge variant="secondary" className="font-mono text-xs">
        {incidentId}
      </Badge>
    </div>
  );
}

export function IncidentFormFields({
  incidentId,
  isPending,
}: IncidentFormFieldsProps) {
  const { control } = useFormContext<AddNewIncident>();

  return (
    <div className="flex flex-col gap-5">
      <IncidentIdBanner incidentId={incidentId} />

      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {FIELD_LABELS.title}
              <span className="text-destructive ml-0.5">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder={FIELD_PLACEHOLDERS.title}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{FIELD_LABELS.description}</FormLabel>
            <FormControl>
              <RichTextEditor
                value={field.value ?? ""}
                onChange={field.onChange}
                maxCharacters={500}
                placeholder={FIELD_PLACEHOLDERS.description}
                readOnly={isPending}
              />
            </FormControl>
            <FormDescription>
              {FIELD_LABELS.description} is optional. Max 500 characters of content.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="service"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{FIELD_LABELS.service}</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder={FIELD_PLACEHOLDERS.service}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          control={control}
          name="severity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {FIELD_LABELS.severity}
                <span className="text-destructive ml-0.5">*</span>
              </FormLabel>
              <FormControl>
                <SelectIncidentSeverity
                  includeAll={false}
                  severity={(field.value as IncidentSeverityType) ?? null}
                  setSeverity={(val) =>
                    field.onChange(val ?? field.value)
                  }
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {FIELD_LABELS.status}
                <span className="text-destructive ml-0.5">*</span>
              </FormLabel>
              <FormControl>
                <SelectIncidentStatus
                  includeAll={false}
                  status={(field.value as IncidentStatusType) ?? null}
                  setStatus={(val) =>
                    field.onChange(val ?? field.value)
                  }
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="assignee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{FIELD_LABELS.assignee}</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder={FIELD_PLACEHOLDERS.assignee}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
