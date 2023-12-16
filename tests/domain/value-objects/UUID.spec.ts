import { UUID } from "@/domain/value-objects";

describe("[VO] UUID", () => {
  const invalidValues = [
    "",
    "invalid-id",
    "12345678-1234-1234-1234-1234567890123",
  ];
  const validValues = [
    "01234567-89ab-cdef-0123-456789abcdef",
    "fedcba98-7654-3210-0123-456789abcdef",
    "00000000-0000-0000-0000-000000000000",
    "ffffffff-ffff-ffff-ffff-ffffffffffff",
  ];

  describe("validation", () => {
    invalidValues.forEach((value) => {
      it(`Should throw on invalid value "${value}"`, () => {
        expect(() => new UUID(value)).toThrow("Invalid UUID");
      });
    });

    validValues.forEach((value) => {
      it(`Should not throw on valid value "${value}"`, () => {
        expect(() => new UUID(value)).not.toThrow();
      });
    });
  });

  describe("methods", () => {
    it("toString should return the value", () => {
      expect(new UUID("01234567-89ab-cdef-0123-456789abcdef").toString()).toBe(
        "01234567-89ab-cdef-0123-456789abcdef"
      );
    });
  });
});
