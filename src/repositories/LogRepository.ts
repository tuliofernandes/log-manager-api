import { Log as LogSchema, ILog } from "../models/Log";

export class LogRepository {
  public async insert(log: ILog): Promise<ILog> {
    const created = await LogSchema.create(log);
    return created;
  }
}
