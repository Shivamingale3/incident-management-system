import type { LucideIcon } from "lucide-react"
import {
  AlertTriangleIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  InfoIcon,
  MinusIcon,
} from "lucide-react"

const SEVERITY = ["critical", "high", "medium", "low", "resolved"] as const

type Severity = (typeof SEVERITY)[number]

const severityConfig: Record<
  Severity,
  {
    label: string
    color: "error" | "warning" | "medium" | "info" | "success"
    icon: LucideIcon
  }
> = {
  critical: {
    label: "Critical",
    color: "error",
    icon: AlertTriangleIcon,
  },
  high: {
    label: "High",
    color: "warning",
    icon: AlertTriangleIcon,
  },
  medium: {
    label: "Medium",
    color: "medium",
    icon: MinusIcon,
  },
  low: {
    label: "Low",
    color: "info",
    icon: ArrowDownIcon,
  },
  resolved: {
    label: "Resolved",
    color: "success",
    icon: CheckCircleIcon,
  },
}

function getSeverityLabel(severity: Severity): string {
  return severityConfig[severity].label
}

function getSeverityColor(severity: Severity): string {
  return severityConfig[severity].color
}

function getSeverityIcon(severity: Severity): LucideIcon {
  return severityConfig[severity].icon
}

function isSeverity(value: string): value is Severity {
  return SEVERITY.includes(value as Severity)
}

export {
  SEVERITY,
  severityConfig,
  getSeverityLabel,
  getSeverityColor,
  getSeverityIcon,
  isSeverity,
}
export type { Severity }
