import { describe, it, expect } from "vitest";
import { routing } from "../src/i18n/routing";

describe("i18n Routing Configuration", () => {
  it("should have uz as default locale", () => {
    expect(routing.defaultLocale).toBe("uz");
  });

  it("should support uz, ru, and en locales", () => {
    expect(routing.locales).toEqual(["uz", "ru", "en"]);
  });

  it("should use as-needed prefix strategy for clean default URLs", () => {
    expect(routing.localePrefix).toBe("as-needed");
  });
});

