import DOMPurify, { type Config } from "dompurify";

/**
 * Defense-in-depth sanitizer for incident `description` HTML.
 *
 * TipTap is schema-safe by design — its ProseMirror schema rejects nodes/marks
 * it doesn't recognise, so a readOnly editor never executes raw innerHTML.
 * This sanitizer is still applied on the readOnly render path as a
 * belt-and-braces guard against:
 *   - Direct DB writes / seeded sample data that bypass the editor
 *   - Future schema drift if an extension is removed but legacy HTML persists
 *
 * The allow-list mirrors the exact tag/attribute set the configured TipTap
 * extension suite can emit (StarterKit + Subscript + Superscript + Link +
 * Table family), so legitimate content round-trips unchanged while anything
 *TipTap's `insertLink` prompt accepts (e.g. a `javascript:` URL typed into
 * the prompt) is neutralised here.
 */
const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "strike",
  "sub",
  "sup",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "code",
  "a",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
];

const ALLOWED_ATTR = ["href", "target", "rel", "colspan", "rowspan"];

const config: Config = {
  ALLOWED_TAGS,
  ALLOWED_ATTR,
  ALLOWED_URI_REGEXP: /^(https?|mailto):/i,
  FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"],
  FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "style"],
};

/**
 * Sanitize a raw HTML string for safe readOnly rendering.
 * Returns an empty string for null/undefined input.
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (html == null) return "";
  return DOMPurify.sanitize(html, config) as string;
}

export default sanitizeHtml;
