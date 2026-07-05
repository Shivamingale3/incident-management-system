import { useState } from "react";
import { useFormContext } from "react-hook-form";
import axios from "axios";

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
import { Button } from "../ui/button";
import useGetSuggestedSeverity from "@/hooks/use-get-suggested-severity";
import SuggestedSeverity from "@/components/app/suggested-severity";
import { toast } from "sonner";

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
  const { control, setValue, getValues } = useFormContext<AddNewIncident>();
  const [showSuggestion, setShowSuggestion] = useState(false);

  const {
    data: recommendation,
    error: queryError,
    isFetching,
    isError,
    refetch,
  } = useGetSuggestedSeverity(() => ({
    title: getValues("title"),
    description: getValues("description") ?? null,
    service: getValues("service") ?? null,
  }));

  const handleSuggestClick = () => {
    if (getValues("title").trim().length > 0) {
      setShowSuggestion(true);
      refetch();
    } else {
      toast.error("Please enter a title to generate severity");
    }
  };

  const handleAccept = (severity: IncidentSeverityType) => {
    setValue("severity", severity, { shouldValidate: true });
    setShowSuggestion(false);
  };

  const handleRetry = () => {
    refetch();
  };

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
              {FIELD_LABELS.description} is optional. Max 500 characters of
              content.
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

      {showSuggestion && (
        <SuggestedSeverity
          recommendation={isFetching ? null : (recommendation ?? null)}
          error={
            !isFetching && isError
              ? axios.isAxiosError(queryError)
                ? (queryError.response?.data?.message ?? queryError.message)
                : "Unknown error"
              : null
          }
          isLoading={isFetching}
          isError={!isFetching && isError}
          onRetry={handleRetry}
          onAccept={handleAccept}
        />
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 items-end">
        <FormField
          control={control}
          name="severity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between w-full mb-1.5">
                <span>
                  {FIELD_LABELS.severity}
                  <span className="text-destructive ml-0.5">*</span>
                </span>
                <Button
                  type="button"
                  variant="secondary"
                  size="xs"
                  className="h-6 rounded bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border border-primary/20 transition-colors px-2 text-[10px] sm:text-xs font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSuggestClick();
                  }}
                  disabled={isPending}
                >
                  ✨ Suggest Severity
                </Button>
              </FormLabel>
              <FormControl>
                <SelectIncidentSeverity
                  includeAll={false}
                  severity={(field.value as IncidentSeverityType) ?? null}
                  setSeverity={(val) => field.onChange(val ?? field.value)}
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
                  setStatus={(val) => field.onChange(val ?? field.value)}
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
