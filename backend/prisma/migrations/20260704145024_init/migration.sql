-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Incident" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "incidentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "service" TEXT,
    "severity" TEXT NOT NULL DEFAULT 'LOW',
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "assignee" TEXT,
    "summary" TEXT,
    "recommendation" TEXT,
    "rootCause" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Incident" ("assignee", "createdAt", "description", "id", "incidentId", "recommendation", "rootCause", "service", "severity", "status", "summary", "title", "updatedAt") SELECT "assignee", "createdAt", "description", "id", "incidentId", "recommendation", "rootCause", "service", "severity", "status", "summary", "title", "updatedAt" FROM "Incident";
DROP TABLE "Incident";
ALTER TABLE "new_Incident" RENAME TO "Incident";
CREATE UNIQUE INDEX "Incident_incidentId_key" ON "Incident"("incidentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
