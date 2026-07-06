import type {
  Incident,
  IncidentStatusType,
  IncidentAiInsights as IncidentAiInsightsType,
} from "@/types/incidents.types";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { SheetContent } from "../ui/sheet";
import {
  formatIncidentCreatedAt,
  formatIncidentCreatedAtToLocale,
} from "@/utils/dateUtils";
import SelectIncidentStatus from "./select-incident-status";
import { RichTextEditor } from "../ui/rich-text-editor";
import { SeverityBadge } from "./severity-badge";
import { IncidentStatusStyles } from "@/constants/incidentStatus.constants";
import IncidentAiInsights from "./incident-ai-insights";
import { Button } from "../ui/button";
import useGetIncidentAiInsights from "@/hooks/use-get-incident-ai-insights";
import { useRegenerateIncidentAiInsights } from "@/hooks/use-regenerate-incident-ai-insights";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RefreshCw } from "lucide-react";

const ViewIncident = ({
  incident,
  handleUpdateStatus,
  isUpdatingIncidentStatus,
  isDesktop = true,
}: {
  incident: Incident;
  handleUpdateStatus: (status: IncidentStatusType) => Promise<void>;
  isUpdatingIncidentStatus: boolean;
  isDesktop?: boolean;
}) => {
  const queryClient = useQueryClient();

  const {
    data: generatedInsights,
    isError: isGenerateError,
    error: generateError,
    refetch: generateInitial,
    isFetching: isGenerating,
  } = useGetIncidentAiInsights(incident.id);

  const {
    mutate: regenerate,
    isPending: isRegenerating,
    isError: isRegenerateError,
    error: regenerateError,
  } = useRegenerateIncidentAiInsights();

  const handleGenerateOrRegenerate = async () => {
    if (incident.summary) {
      regenerate(incident.id);
    } else {
      await generateInitial();
      queryClient.invalidateQueries({ queryKey: ["incident", incident.id] });
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    }
  };

  const isLoadingInsights = isGenerating || isRegenerating;
  const hasError = isGenerateError || isRegenerateError;
  const activeError = generateError || regenerateError;
  const errorMsg = axios.isAxiosError(activeError)
    ? (activeError.response?.data?.message ?? activeError.message)
    : hasError
      ? "Failed to generate AI Insights"
      : null;

  let insightsData: IncidentAiInsightsType | null = null;
  if (
    incident.summary &&
    incident.possibleCauses &&
    incident.recommendedActions
  ) {
    try {
      insightsData = {
        summary: incident.summary,
        possibleCauses: JSON.parse(incident.possibleCauses),
        recommendedActions: JSON.parse(incident.recommendedActions),
        confidence: "MEDIUM" as const,
      };
    } catch (e) {
      console.error("Failed to parse existing incident insights", e);
    }
  } else if (generatedInsights) {
    insightsData = generatedInsights;
  }

  const showInsightsPanel =
    !!incident.summary || isLoadingInsights || hasError || !!generatedInsights;

  const headerNode = (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start shrink-0">
      <div>
        <DialogTitle className="text-base sm:text-xl font-semibold">
          {incident.title}
        </DialogTitle>
        <DialogDescription className="text-sm font-semibold text-primary">
          {incident.incidentId}
        </DialogDescription>
        <DialogDescription className="text-sm font-medium text-muted-foreground">
          {formatIncidentCreatedAt(incident.createdAt)}
        </DialogDescription>
        <SeverityBadge severity={incident.severity} />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 md:mr-5">
        <Button
          onClick={handleGenerateOrRegenerate}
          disabled={isLoadingInsights}
          variant="outline"
          className="border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-600 shadow-sm"
        >
          {isLoadingInsights ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin text-indigo-500" />
          ) : (
            <span className="mr-2">✨</span>
          )}
          <span className="hidden md:inline">
            {incident.summary
              ? "Re-Generate AI Insights"
              : "Generate AI Insights"}
          </span>
          <span className="md:hidden">
            {incident.summary ? "Re-Generate" : "Generate"}
          </span>
        </Button>
        <div className={`border-2 ${IncidentStatusStyles[incident.status]} `}>
          <SelectIncidentStatus
            status={incident.status}
            setStatus={(status) => {
              if (status) handleUpdateStatus(status);
            }}
            disabled={isUpdatingIncidentStatus}
          />
        </div>
      </div>
    </div>
  );

  const bodyNode = (
    <div className="flex-1 overflow-y-auto px-1 pr-3 pb-2 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-3 sm:p-5 bg-muted/20 rounded-none border border-border/40 backdrop-blur-sm shadow-sm">
        <div className="flex flex-col space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Service
          </span>
          <div className="flex items-center gap-2">
            {incident.service ? (
              <span className="text-sm sm:text-base font-medium text-foreground">
                {incident.service}
              </span>
            ) : (
              <span className="text-sm sm:text-base font-medium text-muted-foreground">
                -
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Assignee
          </span>
          {incident.assignee ? (
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                {incident.assignee?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm sm:text-base font-medium text-foreground">
                {incident.assignee}
              </span>
            </div>
          ) : (
            <span className="text-sm sm:text-base font-medium text-foreground">
              -
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Created At
          </span>
          <span className="text-sm sm:text-base font-medium text-foreground">
            {formatIncidentCreatedAtToLocale(incident.createdAt)}
          </span>
        </div>
      </div>

      {incident.description && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold tracking-tight">Description</h3>
          <RichTextEditor
            value={incident.description}
            onChange={() => {}}
            readOnly
          />
        </div>
      )}

      {showInsightsPanel && (
        <div className="pt-2">
          <IncidentAiInsights
            insights={insightsData}
            isLoading={isLoadingInsights}
            isError={hasError}
            error={errorMsg}
            onRetry={handleGenerateOrRegenerate}
            isRetrying={isLoadingInsights}
          />
        </div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <DialogContent
        className="w-full max-w-[calc(100%-2rem)] md:max-w-7xl max-h-[95vh] flex flex-col"
        showCloseButton={true}
      >
        <DialogHeader>{headerNode}</DialogHeader>
        {bodyNode}
      </DialogContent>
    );
  }

  return (
    <SheetContent
      side="bottom"
      showCloseButton={true}
      className="flex max-h-[90vh] flex-col gap-4 p-4"
    >
      <DialogHeader>{headerNode}</DialogHeader>
      {bodyNode}
    </SheetContent>
  );
};

export default ViewIncident;
