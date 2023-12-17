import { DatabaseError } from "@/errors/DatabaseError";

describe("DatabaseError", () => {
  it("should set the error message correctly", () => {
    const errorMessage = "An error occurred";
    const error = new DatabaseError(errorMessage);

    expect(error.message).toBe(errorMessage);
  });

  it("should set the error name correctly", () => {
    const error = new DatabaseError("");

    expect(error.name).toBe("DatabaseError");
  });
});
