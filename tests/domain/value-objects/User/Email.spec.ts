import { Email } from "@/domain/value-objects";

describe("[VO] Email", () => {
  const invalidValues = [
    "",
    "a",
    "invalid@email",
    "invalid@",
    "12345",
    "!@!#%!@#",
    "invalid.email@.com",
    "invalid.email@com.",
    "invalid.email@.com.",
    "invalid.email@com..",
    "invalid.email@com...",
    "invalid.email@com",
    "invalid.email@com.",
    "invalid.email@com..",
    "invalid.email@com...",
  ];
  const validValues = [
    "valid@gmail.com",
    "valid@terra.com.br",
    "valid@mail.uk",
    "valid.email@example.com",
    "valid.email@example.co.uk",
    "valid.email@example.name",
    "valid.email@example.pro",
    "valid.email@example.tel",
    "valid.email@example.xxx",
  ];

  describe("validation", () => {
    invalidValues.forEach((value) => {
      it(`Should throw on invalid value "${value}"`, () => {
        expect(() => new Email(value)).toThrow("Invalid email");
      });
    });

    validValues.forEach((value) => {
      it(`Should not throw on valid value "${value}"`, () => {
        expect(() => new Email(value)).not.toThrow();
      });
    });
  });

  describe("methods", () => {
    it("toString should return the value", () => {
      expect(new Email("valid@terra.com.br").toString()).toBe(
        "valid@terra.com.br"
      );
    });
  });
});
