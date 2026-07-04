"use client"

import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

type ToastVariant = "default" | "success" | "error" | "warning"

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface ToastContextValue {
  toast: (props: Omit<Toast, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a Toaster")
  }
  return context
}

const variantStyles: Record<ToastVariant, string> = {
  default: "border-border",
  success: "border-success/50",
  error: "border-error/50",
  warning: "border-warning/50",
}

const variantIconStyles: Record<ToastVariant, string> = {
  default: "text-foreground",
  success: "text-success",
  error: "text-error",
  warning: "text-warning",
}

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  default: null,
  success: (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  error: (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  ),
  warning: (
    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast
  onDismiss: (id: string) => void
}) {
  const [visible, setVisible] = React.useState(false)
  const [exiting, setExiting] = React.useState(false)

  React.useEffect(() => {
    const showTimer = requestAnimationFrame(() => setVisible(true))

    const dismissTimer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => onDismiss(toast.id), 300)
    }, toast.duration ?? 4000)

    return () => {
      cancelAnimationFrame(showTimer)
      clearTimeout(dismissTimer)
    }
  }, [toast.id, toast.duration, onDismiss])

  const variant = toast.variant ?? "default"

  return (
    <div
      data-slot="toast"
      data-variant={variant}
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border bg-popover p-3 shadow-lg transition-all duration-300",
        variantStyles[variant],
        visible && !exiting
          ? "translate-x-0 opacity-100"
          : "translate-x-4 opacity-0",
      )}
    >
      {variant !== "default" && (
        <div className={cn("mt-0.5", variantIconStyles[variant])}>
          {variantIcons[variant]}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <div className="text-body-md font-medium text-foreground">
            {toast.title}
          </div>
        )}
        {toast.description && (
          <div className="text-body-md text-muted-foreground">
            {toast.description}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          setExiting(true)
          setTimeout(() => onDismiss(toast.id), 300)
        }}
        className="shrink-0 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
      >
        <XIcon className="size-4" />
      </button>
    </div>
  )
}

function Toaster() {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback(
    (props: Omit<Toast, "id">) => {
      const id = crypto.randomUUID()
      setToasts((prev) => [...prev, { id, ...props }])
    },
    [],
  )

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const contextValue = React.useMemo(
    () => ({ toast, dismiss }),
    [toast, dismiss],
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {createPortal(
        <div
          data-slot="toaster"
          className="fixed bottom-4 right-4 z-[var(--z-toast)] flex flex-col-reverse gap-2"
        >
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

export { Toaster, useToast }
export type { ToastVariant }
