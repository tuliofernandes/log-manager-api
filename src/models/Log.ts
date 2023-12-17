import { Document, Schema, model } from "mongoose";

export interface ILog {
  logId: string;
  ip: string;
  datetime: Date;
  type: string;
  version: string;
  title: string;
  description: string;
}

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
