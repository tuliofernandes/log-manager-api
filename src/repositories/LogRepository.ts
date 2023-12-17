import { DatabaseError } from "@/errors/DatabaseError";
import { Log as LogSchema, ILog } from "../models/Log";

export class LogRepository {
  public async insert(log: ILog): Promise<ILog> {
    try {
      const created = await LogSchema.create(log);
      return created;
    } catch (err) {
      const error = err as Error;
      throw new DatabaseError(error.message);
    }
  }
}
