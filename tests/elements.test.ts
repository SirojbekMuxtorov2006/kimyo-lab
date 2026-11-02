import { describe, it, expect } from "vitest";
import { elements, categoryStyles } from "../src/data/elements";

describe("IUPAC Periodic Elements Data", () => {
  it("should contain verified elements with valid numbers and symbols", () => {
    expect(elements.length).toBeGreaterThan(0);

    for (const el of elements) {
      expect(el.atomicNumber).toBeGreaterThan(0);
      expect(el.symbol).toMatch(/^[A-Z][a-z]?$/);
      expect(el.atomicMass).toBeGreaterThan(0);
      expect(el.period).toBeGreaterThanOrEqual(1);
      expect(el.period).toBeLessThanOrEqual(7);
      expect(el.group).toBeGreaterThanOrEqual(1);
      expect(el.group).toBeLessThanOrEqual(18);
      expect(el.name.uz).toBeTruthy();
      expect(el.name.ru).toBeTruthy();
      expect(el.name.en).toBeTruthy();
      expect(categoryStyles[el.category]).toBeDefined();
    }
  });

  it("should have unique atomic numbers", () => {
    const numbers = elements.map((e) => e.atomicNumber);
    const unique = new Set(numbers);
    expect(numbers.length).toBe(unique.size);
  });
});
