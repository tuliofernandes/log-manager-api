import { BadRequestError } from "@/errors/BadRequestError";

describe("BadRequestError", () => {
  it("should have the correct name", () => {
    const error = new BadRequestError("Test error");
    expect(error.name).toBe("BadRequestError");
  });

  it("should have the correct message", () => {
    const error = new BadRequestError("Test error");
    expect(error.message).toBe("BadRequestError: Test error");
  });

  it("should be an instance of Error", () => {
    const error = new BadRequestError("Test error");
    expect(error).toBeInstanceOf(Error);
  });
});
