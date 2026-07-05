import type { SuggestedSeverityProps } from "@/types/incidents.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { SeverityBadge } from "./severity-badge";
import { Loader2, AlertCircle, RefreshCw, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SuggestedSeverity = ({
  recommendation,
  error,
  isLoading,
  isError,
  onRetry,
  onAccept,
}: SuggestedSeverityProps) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 shadow-sm",
        isError
          ? "border-destructive/50 bg-destructive/5"
          : "border-indigo-500/20 bg-linear-to-br from-indigo-500/5 via-background to-purple-500/5",
      )}
    >
      {!isError && !isLoading && (
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      )}

      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Sparkles
            className={cn(
              "h-4 w-4",
              isError ? "text-destructive" : "text-indigo-500",
            )}
          />
          AI Suggested Severity
        </CardTitle>
        <CardDescription className="text-xs">
          Automatically analyzed based on incident details
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        {isLoading ? (
          <div className="space-y-3 py-2">
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 animate-pulse rounded bg-muted/80" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-muted/80" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-3 w-16 animate-pulse rounded bg-muted/80" />
              <div className="h-3 w-full animate-pulse rounded bg-muted/80" />
              <div className="h-3 w-11/12 animate-pulse rounded bg-muted/80" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-muted/80" />
            </div>
            <div className="flex items-center gap-2 pt-4">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground animate-pulse">
                Analyzing incident data...
              </span>
            </div>
          </div>
        ) : isError ? (
          <div className="flex flex-col gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-3.5">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="mt-0.5 h-4 w-4 text-destructive shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">
                  Analysis Failed
                </p>
                <p className="text-xs text-destructive/80 leading-relaxed">
                  {error ||
                    "Could not generate a severity recommendation at this time."}
                </p>
              </div>
            </div>
          </div>
        ) : recommendation ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-background/60 p-3 border border-border/40 shadow-sm backdrop-blur-sm">
              <span className="text-sm font-medium">Recommended</span>
              {recommendation.severity === "UNKNOWN" ? (
                <span className="text-xs font-semibold px-2.5 py-1 bg-muted text-muted-foreground rounded-full">
                  UNKNOWN
                </span>
              ) : (
                <SeverityBadge severity={recommendation.severity} />
              )}
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Reasoning
              </span>
              <p className="text-sm leading-relaxed text-foreground/90">
                {recommendation.reason}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 mb-2">
              <Sparkles className="h-5 w-5 text-muted-foreground/50" />
            </div>
            <p className="text-sm text-muted-foreground">
              Provide more details to get an AI suggestion.
            </p>
          </div>
        )}
      </CardContent>

      {(isError || recommendation) && !isLoading && (
        <CardFooter className="flex items-center justify-end gap-2 pt-1 border-t-0 pb-4 relative z-10">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRetry}
            className={cn(
              "h-8 px-3 text-xs",
              isError &&
                "border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive",
            )}
          >
            <RefreshCw
              className={cn(
                "mr-1.5 h-3 w-3",
                isError ? "" : "text-muted-foreground",
              )}
            />
            Retry
          </Button>
          {!isError && recommendation && (
            <Button
              type="button"
              variant="default"
              size="sm"
              className="h-8 px-3 text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
              disabled={recommendation.severity === "UNKNOWN"}
              onClick={() => {
                if (recommendation.severity !== "UNKNOWN") {
                  onAccept(recommendation.severity);
                }
              }}
            >
              <Check className="mr-1.5 h-3 w-3" />
              Accept
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default SuggestedSeverity;
