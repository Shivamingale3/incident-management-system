import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (tw-merge + clsx)", () => {
  it("joins multiple class strings", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("skips falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("dedupes conflicting tailwind classes (latest wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("keeps non-conflicting tailwind classes", () => {
    expect(cn("px-2", "py-3")).toBe("px-2 py-3");
  });

  it("supports the array/objects clsx accepts", () => {
    expect(cn("a", { active: true, disabled: false }, ["b", "c"])).toBe(
      "a active b c",
    );
  });
});
