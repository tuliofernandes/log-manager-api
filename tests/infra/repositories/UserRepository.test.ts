import { faker } from "@faker-js/faker";

import { UserRepository } from "@/infra/repositories/";

import { fixtureEntity, fixtureSchema } from "@/tests/fixtures/entities/User";

import db from "@/config/database/client";
import { Email, FullName, UUID } from "@/domain/value-objects";
import { UserDTO } from "@/domain/dtos";
import { User } from "@/domain/entities";

describe("[Repository] User", () => {
  let userRepository: UserRepository;
  let createdUser: User;

  beforeEach(() => {
    jest.clearAllMocks();
    userRepository = new UserRepository();
  });

  describe("create", () => {
    it("Should be able to throw if database throw", async () => {
      jest
        .spyOn(db.user, "create")
        .mockRejectedValueOnce(new Error("db_error"));

      await expect(userRepository.create(fixtureEntity)).rejects.toThrow(
        new Error("InfraException: db_error")
      );
    });

    it("Should be able to create a user", async () => {
      createdUser = await userRepository.create(fixtureEntity);
      expect(createdUser.toJson().name).toEqual(fixtureSchema.name);
    });
  });

  describe("findByEmail", () => {
    it("Should be able to throw if database throw", async () => {
      jest
        .spyOn(db.user, "findFirst")
        .mockRejectedValueOnce(new Error("db_error"));

      await expect(
        userRepository.findByEmail(new Email(fixtureSchema.email))
      ).rejects.toThrow("InfraException: db_error");
    });

    it("Should be able to return null if user not found", async () => {
      jest.spyOn(db.user, "findFirst").mockResolvedValueOnce(null);

      const user = await userRepository.findByEmail(
        new Email(fixtureSchema.email)
      );
      expect(user).toBeNull();
    });

    it("Should be able to return the found user", async () => {
      jest.spyOn(db.user, "findFirst").mockResolvedValueOnce(fixtureSchema);

      const user = await userRepository.findByEmail(
        new Email(fixtureSchema.email)
      );
      expect(user?.toJson().name).toEqual(fixtureSchema.name);
    });
  });

  describe("update", () => {
    it("Should be able to throw if database throw", async () => {
      jest
        .spyOn(db.user, "update")
        .mockRejectedValueOnce(new Error("db_error"));

      const userDto = new UserDTO(new UUID(fixtureSchema.id));
      await expect(userRepository.update(userDto)).rejects.toThrow(
        new Error("InfraException: db_error")
      );
    });

    it("Should be able to update a user", async () => {
      const newName = faker.person.fullName();
      const userDto = new UserDTO(
        new UUID(createdUser.id!.toString()),
        new FullName(newName)
      );

      const updatedUser = await userRepository.update(userDto);
      expect(updatedUser.toJson()).toEqual(
        expect.objectContaining({
          id: createdUser.id?.toString(),
          name: newName,
          email: fixtureSchema.email.toString(),
          password: fixtureSchema.password.toString(),
        })
      );
    });
  });

  describe("delete", () => {
    it("Should be able to throw if database throw", async () => {
      jest
        .spyOn(db.user, "delete")
        .mockRejectedValueOnce(new Error("db_error"));

      await expect(userRepository.delete(createdUser.id!)).rejects.toThrow(
        new Error("InfraException: db_error")
      );
    });

    it("Should be able to delete a user", async () => {
      await userRepository.delete(createdUser.id!);

      await expect(
        userRepository.findByEmail(new Email(fixtureSchema.email))
      ).resolves.toBeNull();
    });
  });
});
