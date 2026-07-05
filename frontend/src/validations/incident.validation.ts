import stripHtml from "@/utils/stripHtml";
import { z } from "zod";

export const addIncidentValidationSchema = z.object({
  title: z
    .string("Title is required")
    .trim()
    .min(5, "Title is too short, must be at least 5 characters")
    .max(500, "Title is too long, must not exceed 500 characters"),
  incidentId: z
    .string("Incident ID is missing")
    .startsWith("INC", "Invalid Incident ID")
    .nonoptional(),
  description: z
    .string("Description must be a string")
    .nullish()
    .transform((val) => (!val || stripHtml(val).length === 0 ? null : val))
    .pipe(
      z
        .string()
        .refine(
          (val) => {
            const textContent = stripHtml(val);
            return textContent.length >= 5;
          },
          {
            message:
              "Description content is too short, must be at least 5 characters",
          },
        )
        .refine(
          (val) => {
            const textContent = stripHtml(val);
            return textContent.length <= 500;
          },
          {
            message:
              "Description content is too long, must not exceed 500 characters",
          },
        )
        .nullable(),
    ),
  service: z
    .string("Service must be a string")
    .nullish()
    .transform((val) => (!val || val.trim() === "" ? null : val.trim()))
    .pipe(
      z
        .string()
        .min(2, "Service name must be at least 2 characters")
        .max(100, "Service name must not exceed 100 characters")
        .nullable(),
    ),

  severity: z.enum(
    ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
    "Severity is required",
  ),

  status: z.enum(
    ["OPEN", "INVESTIGATING", "IN_PROGRESS", "RESOLVED", "CLOSED"],
    "Status is required",
  ),

  assignee: z
    .string("Assignee must be a string")
    .nullish()
    .transform((val) => (!val || val.trim() === "" ? null : val.trim()))
    .pipe(
      z
        .string()
        .min(1, "Assignee name must be at least 1 character")
        .max(100, "Assignee name must not exceed 100 characters")
        .nullable(),
    ),
});
