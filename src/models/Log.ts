import { Document, Schema, model } from "mongoose";

import { ILog } from "../interfaces/ILog";

export interface ILogDocument extends ILog, Document {}

const logSchema = new Schema({
  logId: { type: String, required: true },
  ip: { type: String, required: true },
  datetime: { type: Date, required: true },
  type: { type: String, required: true },
  version: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const Log = model<ILog>("Log", logSchema);
