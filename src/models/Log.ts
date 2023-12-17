import { Document, Schema, model } from "mongoose";

export interface ILog {
  ip: string;
  date: Date;
  time: Date;
  type: string;
  version: string;
  description: string;
}

export interface ILogDocument extends ILog, Document {}

const logSchema = new Schema({
  ip: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  type: { type: String, required: true },
  version: { type: String, required: true },
  description: { type: String, required: true },
});

export const Log = model<ILog>("Log", logSchema);
