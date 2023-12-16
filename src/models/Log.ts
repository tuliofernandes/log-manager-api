import mongoose, { Document, Schema } from "mongoose";

export interface ILog extends Document {
  ipAddress: string;
  date: Date;
  application: string;
  version: string;
  userId: string;
  message: string;
  uploadId: mongoose.Types.ObjectId;
}

const LogSchema: Schema = new Schema({
  ipAddress: { type: String, required: true },
  date: { type: Date, required: true },
  application: { type: String, required: true },
  version: { type: String, required: true },
  userId: { type: String, required: true },
  message: { type: String, required: true },
  uploadId: { type: mongoose.Types.ObjectId, ref: "Upload" },
});

const Log = mongoose.model<ILog>("Log", LogSchema);

export default Log;
