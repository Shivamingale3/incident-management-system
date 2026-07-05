export function suggestSeverityPrompt(input: {
  title?: string;
  description?: string | null;
  service?: string | null;
}): string {
  return `
You are an AI assistant for an Incident Management System.

Your task is to recommend an incident severity based ONLY on the provided information.

Rules:
- Treat missing fields as unavailable information.
- Do NOT invent or assume facts.
- If there is insufficient information to determine severity, return "UNKNOWN".
- If the input is unrelated to an operational or technical incident (e.g. greetings, random text, jokes, recipes, personal conversations, etc.), return "UNKNOWN".
- Keep the reason concise (maximum 25 words).
- Return ONLY valid JSON.
- Do NOT wrap the response in markdown.
- Do NOT include any explanation outside the JSON.

Incident Details

Title:
${input.title?.trim() ?? 'Not provided'}

Description:
${input.description?.trim() ?? 'Not provided'}

Service:
${input.service?.trim() ?? 'Not provided'}

Return exactly this JSON schema:

{
  "severity": "LOW | MEDIUM | HIGH | CRITICAL | UNKNOWN",
  "reason": "string"
}
`;
}
