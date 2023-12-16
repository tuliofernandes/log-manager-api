import { DateTime } from "@/domain/value-objects";

describe("[VO] DateTime", () => {
  describe("validation", () => {
    const validValues = [0, 1625097600, 2147483647];
    const invalidValues = [-1, 0.5, 2147483648];

    invalidValues.forEach((value) => {
      it(`Should throw on invalid value "${value}"`, () => {
        expect(() => new DateTime(value)).toThrow("Invalid datetime");
      });
    });

    validValues.forEach((value) => {
      it(`Should not throw on valid value "${value}"`, () => {
        expect(() => new DateTime(value)).not.toThrow();
      });
    });
  });

  describe("methods", () => {
    it("Should return the ISO string representation of the datetime", () => {
      const dateTime = new DateTime(1625097600);
      expect(dateTime.toISO()).toBe("2021-07-01T00:00:00.000Z");
    });

    it("Should return the local ISO string representation of the datetime", () => {
      const dateTime = new DateTime(859690800);
      expect(dateTime.toLocalISO()).toBe("30/03/1997, 00:00:00");
    });

    it("Should return the UNIX timestamp", () => {
      const dateTime = new DateTime(1625097600);
      expect(dateTime.toTimestamp()).toBe(1625097600);
    });
  });
});
