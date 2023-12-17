import { Schema, model } from "mongoose";

interface ILog {
  ip: string;
  date: Date;
  time: Date;
  type: string;
  version: string;
  description: string;
}

const logSchema = new Schema({
  ip: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  type: { type: String, required: true },
  version: { type: String, required: true },
  description: { type: String, required: true },
});

const Log = model<ILog>("Log", logSchema);

export { Log, ILog };
