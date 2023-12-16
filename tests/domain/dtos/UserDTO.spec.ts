import { Email, FullName, Password, UUID } from "@/domain/value-objects";
import { UserDTO } from "@/domain/dtos";
import { fixtureSchema } from "@/tests/fixtures/entities/User";

describe("[DTO] User", () => {
  describe("methods", () => {
    it("toJson should be able to return the dto's JSON value", () => {
      expect(
        new UserDTO(
          new UUID(fixtureSchema.id),
          new FullName(fixtureSchema.name),
          new Email(fixtureSchema.email),
          new Password(fixtureSchema.password)
        ).toJson()
      ).toEqual({
        id: fixtureSchema.id,
        name: fixtureSchema.name,
        email: fixtureSchema.email,
        password: fixtureSchema.password,
      });

      expect(new UserDTO(new UUID(fixtureSchema.id)).toJson()).toEqual({
        id: fixtureSchema.id,
      });
    });
  });
});
