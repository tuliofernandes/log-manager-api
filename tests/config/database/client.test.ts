import db from "@/config/database/client";

describe("[Service] Database client", () => {
  it("Should be able to connect to the database", async () => {
    await expect(db.$connect()).resolves.not.toThrow();
  });

  it("Should be able to disconnect from the database", async () => {
    await expect(db.$disconnect()).resolves.not.toThrow();
  });
});
