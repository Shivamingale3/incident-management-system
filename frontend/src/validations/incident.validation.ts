import { z } from "zod";

export const addIncidentValidationSchema = z.object({
  title: z
    .string("Title is required")
    .min(5, "Title is too short, must be at least 5 characters")
    .max(500, "Title is too long, must not exceed 500 characters"),

  description: z
    .string("Description must be a string")
    .min(5, "Description is too short, must be at least 5 characters")
    .max(500, "Description is too long, must not exceed 500 characters")
    .nullish(),

  service: z
    .string("Service must be a string")
    .min(2, "Service name must be at least 2 characters")
    .max(100, "Service name must not exceed 100 characters")
    .nullish(),

  severity: z
    .enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"], "Severity is required")
    .optional(),

  status: z
    .enum(
      ["OPEN", "INVESTIGATING", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      "Status is required",
    )
    .optional(),

  assignee: z
    .string("Assignee must be a string")
    .min(1, "Assignee name must be at least 1 character")
    .max(100, "Assignee name must not exceed 100 characters")
    .nullish(),
});
