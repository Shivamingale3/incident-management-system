import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../../ui/button";

interface IncidentAiInsightsErrorProps {
  error: string | null;
  onRetry: () => void;
  isRetrying: boolean;
}

const IncidentAiInsightsError = ({
  error,
  onRetry,
  isRetrying,
}: IncidentAiInsightsErrorProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-3.5 mt-2">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="mt-0.5 h-4 w-4 text-destructive shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-destructive">
            Insights Generation Failed
          </p>
          <p className="text-xs text-destructive/80 leading-relaxed">
            {error ||
              "Could not generate AI insights at this time. Please try again."}
          </p>
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          disabled={isRetrying}
          className="h-7 px-3 text-xs border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <RefreshCw
            className={`mr-1.5 h-3 w-3 ${isRetrying ? "animate-spin" : ""}`}
          />
          Retry
        </Button>
      </div>
    </div>
  );
};

export default IncidentAiInsightsError;
