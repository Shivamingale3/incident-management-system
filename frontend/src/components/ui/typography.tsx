import * as React from "react"

import { cn } from "@/lib/utils"

type TypographyVariant =
  | "display"
  | "heading"
  | "h1"
  | "subheading"
  | "h2"
  | "title"
  | "lead"
  | "paragraph"
  | "body"
  | "caption"
  | "label"
  | "headline-lg"
  | "headline-md"
  | "title-lg"
  | "body-lg"
  | "body-md"
  | "label-md"
  | "label-sm"

type AllowedTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label"

const variantMap: Record<TypographyVariant, { className: string; defaultAs: AllowedTag }> = {
  display:       { className: "text-display",       defaultAs: "h1" },
  heading:       { className: "text-headline-lg",   defaultAs: "h1" },
  h1:            { className: "text-headline-lg",   defaultAs: "h1" },
  subheading:    { className: "text-headline-md",   defaultAs: "h2" },
  h2:            { className: "text-headline-md",   defaultAs: "h2" },
  title:         { className: "text-title-lg",      defaultAs: "h3" },
  lead:          { className: "text-body-lg",       defaultAs: "p" },
  paragraph:     { className: "text-body-md",       defaultAs: "p" },
  body:          { className: "text-body-md",       defaultAs: "p" },
  caption:       { className: "text-label-md",      defaultAs: "span" },
  label:         { className: "text-label-sm",      defaultAs: "span" },
  "headline-lg": { className: "text-headline-lg",   defaultAs: "h1" },
  "headline-md": { className: "text-headline-md",   defaultAs: "h2" },
  "title-lg":    { className: "text-title-lg",      defaultAs: "h3" },
  "body-lg":     { className: "text-body-lg",       defaultAs: "p" },
  "body-md":     { className: "text-body-md",       defaultAs: "p" },
  "label-md":    { className: "text-label-md",      defaultAs: "span" },
  "label-sm":    { className: "text-label-sm",      defaultAs: "span" },
}

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: AllowedTag
}

function Typography({
  variant = "body-md",
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  const config = variantMap[variant]
  const Component = as ?? config.defaultAs

  return (
    <Component
      className={cn(config.className, className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export { Typography }
export type { TypographyVariant, TypographyProps }
