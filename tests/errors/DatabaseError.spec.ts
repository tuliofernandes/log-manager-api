import { DatabaseError } from "@/errors/DatabaseError";

describe("DatabaseError", () => {
  it("should have the correct name", () => {
    const error = new DatabaseError("Test error");
    expect(error.name).toBe("DatabaseError");
  });

  it("should have the correct message", () => {
    const error = new DatabaseError("Test error");
    expect(error.message).toBe("DatabaseError: Test error");
  });

  it("should be an instance of Error", () => {
    const error = new DatabaseError("Test error");
    expect(error).toBeInstanceOf(Error);
  });
});
