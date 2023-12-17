import mongoose, { MongooseError } from "mongoose";

const connectDatabase = async () => {
  await mongoose
    .connect("mongodb://test:test@localhost:27017/test", {})
    .then(() => {
      console.log("MongoDB connection successful");
    })
    .catch((error: MongooseError) => {
      console.log({ error });
      console.error("MongoDB connection error: ", error.message);
    });
};

export { connectDatabase };
