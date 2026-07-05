/*
  Warnings:

  - You are about to drop the column `recommendation` on the `incidents` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_incidents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "incidentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "service" TEXT,
    "severity" TEXT NOT NULL DEFAULT 'LOW',
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "assignee" TEXT,
    "summary" TEXT,
    "possibleCauses" TEXT,
    "recommendedActions" TEXT,
    "rootCause" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_incidents" ("assignee", "createdAt", "description", "id", "incidentId", "rootCause", "service", "severity", "status", "summary", "title", "updatedAt") SELECT "assignee", "createdAt", "description", "id", "incidentId", "rootCause", "service", "severity", "status", "summary", "title", "updatedAt" FROM "incidents";
DROP TABLE "incidents";
ALTER TABLE "new_incidents" RENAME TO "incidents";
CREATE UNIQUE INDEX "incidents_incidentId_key" ON "incidents"("incidentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
