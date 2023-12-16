import mongoose, { Schema, Document } from "mongoose";

import { ILog } from "./Log";

interface IUpload extends Document {
  name: string;
  logs: ILog[];
  createdAt: Date;
}

const UploadSchema: Schema = new Schema({
  name: { type: String, required: true },
  logs: [{ type: mongoose.Types.ObjectId, ref: "Log" }],
  createdAt: { type: Date, default: Date.now },
});

const Upload = mongoose.model<IUpload>("Upload", UploadSchema);

export default Upload;
