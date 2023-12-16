import { faker } from "@faker-js/faker";
import RandExp from "randexp";

import { User } from "@/domain/entities";
import { Email, FullName, Password, UUID } from "@/domain/value-objects";

export const fixtureSchema = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: new RandExp(Password.getPattern()).gen(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const fixtureEntity = new User(
  new FullName(fixtureSchema.name),
  new Email(fixtureSchema.email),
  new Password(fixtureSchema.password),
  new UUID(fixtureSchema.id)
);
