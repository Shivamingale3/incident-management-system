import {
  Sparkles,
  Brain,
  CheckCircle2,
  ChevronRight,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type IncidentAiInsights as IncidentAiInsightsType } from "@/types/incidents.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import IncidentAiInsightsSkeleton from "./skeletons/incident-ai-insights-skeleton";
import IncidentAiInsightsError from "./errors/incident-ai-insights-error";

interface IncidentAiInsightsProps {
  insights: IncidentAiInsightsType | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  onRetry: () => void;
  isRetrying: boolean;
}

const IncidentAiInsights = ({
  insights,
  isLoading,
  isError,
  error,
  onRetry,
  isRetrying,
}: IncidentAiInsightsProps) => {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence?.toUpperCase()) {
      case "HIGH":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "MEDIUM":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "LOW":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 shadow-sm",
        isError && !insights
          ? "border-destructive/50 bg-destructive/5"
          : "border-indigo-500/20 bg-linear-to-br from-indigo-500/5 via-background to-purple-500/5",
      )}
    >
      {(!isError || insights) && !isLoading && (
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      )}

      <CardHeader className="pb-3 relative z-10 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Brain
              className={cn(
                "h-4 w-4",
                isError && !insights ? "text-destructive" : "text-indigo-500",
              )}
            />
            AI Incident Insights
          </CardTitle>
          <CardDescription className="text-xs mt-1">
            Automated analysis and recommended actions
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        {isLoading ? (
          <IncidentAiInsightsSkeleton />
        ) : isError && !insights ? (
          <IncidentAiInsightsError
            error={error || "Failed to load insights"}
            onRetry={onRetry}
            isRetrying={isRetrying}
          />
        ) : insights ? (
          <div className="space-y-5">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Summary
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90 bg-background/60 p-3 rounded-lg border border-border/40 shadow-sm backdrop-blur-sm">
                {insights.summary}
              </p>
            </div>

            {/* Possible Causes */}
            {insights.possibleCauses && insights.possibleCauses.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Possible Causes
                </span>
                <ul className="space-y-2">
                  {insights?.possibleCauses?.map((cause, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Actions */}
            {insights.recommendedActions &&
              insights.recommendedActions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Recommended Actions
                  </span>
                  <div className="grid gap-2">
                    {insights.recommendedActions.map((action, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2.5 p-2.5 rounded-md bg-muted/40 border border-muted"
                      >
                        <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Footer Alert & Confidence */}
            <div className="pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-foreground/60 bg-muted/50 p-1.5 px-2.5 rounded-md">
                <BarChart2 className="h-3.5 w-3.5 shrink-0" />
                <span>
                  AI Insights are suggestions and should be verified before
                  accepting.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-muted-foreground">
                  Confidence:
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "px-2 py-0.5 text-[10px] font-semibold border",
                    getConfidenceColor(insights.confidence),
                  )}
                >
                  {insights.confidence || "MEDIUM"}
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 mb-2">
              <Brain className="h-5 w-5 text-muted-foreground/50" />
            </div>
            <p className="text-sm text-muted-foreground">
              Insights will appear here once generated.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncidentAiInsights;
