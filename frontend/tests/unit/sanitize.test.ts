import { describe, it, expect } from "vitest";
import { sanitizeHtml } from "@/lib/sanitize";

describe("sanitizeHtml", () => {
  it("returns empty string for null input", () => {
    expect(sanitizeHtml(null)).toBe("");
  });

  it("returns empty string for undefined input", () => {
    expect(sanitizeHtml(undefined)).toBe("");
  });

  it("passes safe TipTap HTML through unchanged", () => {
    const input =
      "<p>Hello <strong>world</strong> <em>test</em></p><ul><li>one</li><li>two</li></ul>";
    expect(sanitizeHtml(input)).toBe(input);
  });

  it("allows href on anchor tags", () => {
    const input = '<a href="https://example.com">link</a>';
    expect(sanitizeHtml(input)).toBe(input);
  });

  it("strips javascript: href from anchor tags", () => {
    const input = '<a href="javascript:alert(1)">click</a>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("javascript:");
    expect(result).toContain("click");
  });

  it("strips script tags entirely", () => {
    const input = 'safe <script>alert("xss")</script> content';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("<script>");
    expect(result).toContain("safe");
    expect(result).toContain("content");
  });

  it("strips iframe tags", () => {
    const input = '<iframe src="https://evil.com"></iframe><p>ok</p>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("<iframe>");
    expect(result).toContain("<p>ok</p>");
  });

  it("strips onerror attributes", () => {
    const input = '<img src="x" onerror="alert(1)">';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("onerror");
  });

  it("allows table markup from TipTap", () => {
    const input =
      "<table><thead><tr><th>A</th></tr></thead><tbody><tr><td>B</td></tr></tbody></table>";
    expect(sanitizeHtml(input)).toBe(input);
  });

  it("allows sub and sup tags", () => {
    const input = "<p>H<sub>2</sub>O x<sup>2</sup></p>";
    expect(sanitizeHtml(input)).toBe(input);
  });

  it("allows blockquote and code", () => {
    const input = "<blockquote><code>const x = 1;</code></blockquote>";
    expect(sanitizeHtml(input)).toBe(input);
  });

  it("strips style tags", () => {
    const input = "<style>body{background:red}</style><p>safe</p>";
    const result = sanitizeHtml(input);
    expect(result).not.toContain("<style>");
    expect(result).toContain("<p>safe</p>");
  });

  it("strips style attributes", () => {
    const input = '<p style="background:red">text</p>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain("style");
  });

  it("handles empty string", () => {
    expect(sanitizeHtml("")).toBe("");
  });

  it("handles plain text without tags", () => {
    expect(sanitizeHtml("just plain text")).toBe("just plain text");
  });
});
