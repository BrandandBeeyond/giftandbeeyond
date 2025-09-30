import { MONGO_URI } from "@/config/config";
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) return;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in .env.local");
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("DB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw new Error("DB connection failed");
  }
};
