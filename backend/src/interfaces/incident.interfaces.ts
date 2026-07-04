import type { Incident } from '@prisma/client';

export interface GetIncidentsByFilterResponse {
  data: Incident[];
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
}
