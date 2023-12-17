export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
    this.message = `DatabaseError: ${message}`;
  }
}
