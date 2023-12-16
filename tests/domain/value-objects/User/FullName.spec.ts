import { FullName } from "@/domain/value-objects";

describe("[VO] FullName", () => {
  const invalidValues = ["", "a", "a".repeat(51), "John123", "John$ Doe"];
  const validValues = [
    "John Doe",
    "John Doe Jr.",
    "Túlio Fernandes",
    "Jô",
    "Gil",
    "O'Brien",
  ];

  describe("validation", () => {
    invalidValues.forEach((value) => {
      it(`Should throw on invalid value "${value}"`, () => {
        expect(() => new FullName(value)).toThrow("Invalid full name");
      });
    });

    validValues.forEach((value) => {
      it(`Should not throw on valid value "${value}"`, () => {
        expect(() => new FullName(value)).not.toThrow();
      });
    });
  });

  describe("methods", () => {
    it("toString should return the value", () => {
      expect(new FullName("John Doe").toString()).toBe("John Doe");
    });
  });
});
