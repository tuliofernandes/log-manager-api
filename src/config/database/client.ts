import mongoose, { MongooseError } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import env from "../env";

const connectDatabase = async () => {
  await mongoose
    .connect(env.DATABASE_URL, {})
    .then(() => {
      console.log("MongoDB connection successful");
    })
    .catch((error: MongooseError) => {
      console.log({ error });
      console.error("MongoDB connection error: ", error.message);
    });
};

export { connectDatabase };
