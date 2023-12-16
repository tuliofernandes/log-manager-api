import { User } from "@/domain/entities";
import { Email, FullName, Password, UUID } from "@/domain/value-objects";

import { fixtureSchema } from "@/tests/fixtures/entities/User";

describe("[Entity] User", () => {
  it("toJson method should return the entity's json value", () => {
    const user = new User(
      new FullName(fixtureSchema.name),
      new Email(fixtureSchema.email),
      new Password(fixtureSchema.password),
      new UUID(fixtureSchema.id)
    );

    expect(user.toJson()).toEqual({
      name: fixtureSchema.name,
      email: fixtureSchema.email,
      password: fixtureSchema.password,
      id: fixtureSchema.id,
    });
  });
});
