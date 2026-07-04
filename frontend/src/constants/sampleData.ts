import { IncidentSeverity } from "./incidentSererity.constants";
import { IncidentStatus } from "./incidentStatus.constants";

export const incidents = [
  {
    id: "INC-2026-001",
    title: "Database Service Down",
    description: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Incident Report - IT Major Outage</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 800px;
            margin: 40px auto;
            padding: 0 20px;
        }
        h1 {
            color: #d9383a;
            border-bottom: 2px solid #d9383a;
            padding-bottom: 10px;
        }
        h2 {
            color: #0052cc;
            margin-top: 30px;
        }
        h3 {
            color: #172b4d;
        }
        a {
            color: #0052cc;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #dddddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #f4f5f7;
            font-weight: 600;
        }
        blockquote {
            background: #fff9db;
            border-left: 5px solid #fab005;
            margin: 1.5em 10px;
            padding: 0.5em 10px;
            font-style: italic;
        }
        code {
            background-color: #f4f5f7;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
            font-size: 85%;
        }
        pre {
            background-color: #f4f5f7;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
        }
        pre code {
            background-color: transparent;
            padding: 0;
        }
        .badge {
            background-color: #ffe8e8;
            color: #e53e3e;
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 12px;
        }
    </style>
</head>
<body>

    <h1>INCIDENT-8492: Payment Gateway Outage <span class="badge">P1 - CRITICAL</span></h1>
    
    <p><strong>Date of Incident:</strong> July 4, 2026<br>
    <strong>Owner:</strong> DevOps Incident Response Team<br>
    <strong>Status:</strong> <span style="color: #38a169; font-weight: bold;">Resolved</span></p>

    <hr>

    <h2>1. Executive Summary</h2>
    <p>At 09:15 UTC, the primary API gateway began dropping inbound customer transactions. The issue persisted for 42 minutes, resulting in a 14% drop in successful checkouts. Normal operations were completely restored by 09:57 UTC after rolling back a corrupted database schema update.</p>
    
    <blockquote>
        "This incident triggered our automated internal SLA breach alarms. Cross-team collaboration between DBAs and Site Reliability Engineering (SRE) was initiated immediately."
    </blockquote>

    <h2>2. Impact Analytics & Breakdown</h2>
    <p>Below is the recorded breakdown of the core infrastructure health metrics captured during the disruption window:</p>
    
    <table>
        <thead>
            <tr>
                <th>Service Layer</th>
                <th>Error Rate</th>
                <th>Affected Infrastructure</th>
                <th>Recovery Verification</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>api.payments.main</code></td>
                <td><span style="color: #e53e3e;">88.4%</span></td>
                <td>US-East-1 Cluster B</td>
                <td>Passed at 09:52 UTC</td>
            </tr>
            <tr>
                <td><code>auth.user.session</code></td>
                <td><span style="color: #dd6b20;">12.1%</span></td>
                <td>Global Redis Cache Cache-03</td>
                <td>Passed at 09:45 UTC</td>
            </tr>
            <tr>
                <td><code>notify.messaging</code></td>
                <td>0.0%</td>
                <td>No Impact</td>
                <td>N/A</td>
            </tr>
        </tbody>
    </table>

    <h2>3. Root Cause Analysis (RCA)</h2>
    <h3>What Failed?</h3>
    <p>The automated migration runner executed a faulty script that locked the primary <code>transactions</code> data block. This created an immediate connection pool exhaustion error.</p>
    
    <p>The following trace snippet highlights the exact syntax exception caught by our log aggregation servers:</p>
    
    <pre><code>[ERROR] 2026-07-04 09:15:22 UTC - ConnectionPoolTimeoutException: 
Timeout waiting for connection from pool after 5000ms. 
Active Connections: 200/200. Maxed out table lock on 'transactions'.</code></pre>

    <h2>4. Remediation Steps Taken</h2>
    <p>The engineering team executed the following runbook items sequentially to restore service:</p>
    <ul>
        <li><strong>Isolate:</strong> Rerouted 100% of global checkout traffic to the backup secondary data facility.</li>
        <li><strong>Rollback:</strong> Executed script <code>db_rollback_v4.2.sql</code> to release the hard column locks.</li>
        <li><strong>Purge:</strong> Flushed the local Redis worker queues to eliminate corrupted payload retries.</li>
    </ul>

    <h2>5. Preventative Actions</h2>
    <p>To eliminate this specific failure vector moving forward, we are changing our deployment policies:</p>
    <ol>
        <li>Mandate a strict 48-hour staging soak time for all relational database schema modifications.</li>
        <li>Implement localized circuit breakers using the open-source frameworks listed on the <a href="https://atlassian.com" target="_blank">Atlassian Incident Best Practices Directory</a>.</li>
        <li>Update our internal metrics dashboard configurations inside our corporate <a href="https://servicenow.com" target="_blank">ServiceNow Instance</a>.</li>
    </ol>

    <p><em>Report compiled automatically by the IT Service Management logging engine. For internal circulation only.</em></p>

</body>
</html>
`,
    service: "Database Service",
    severity: IncidentSeverity.LOW,
    status: IncidentStatus.OPEN,
    assignee: "Riya",
    createdAt: "2026-07-04T13:41:42+05:30",
    updatedAt: "2026-07-04T13:41:42+05:30",
  },
];
