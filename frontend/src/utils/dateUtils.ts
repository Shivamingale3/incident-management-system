import { DateTime } from "luxon";

export function formatIncidentCreatedAt(
  isoDate: string = "2026-07-04T13:41:42+05:30",
): string {
  const date = DateTime.fromISO(isoDate);
  return date.toRelative();
}

export function formatIncidentCreatedAtToLocale(isoDate: string) {
  const date = DateTime.fromISO(isoDate);
  return date.toFormat("dd/MM/yyyy - h:mm a");
}
