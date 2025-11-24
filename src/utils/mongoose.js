import mongoose from "mongoose";

export default function () {
  try {
    mongoose.connect(process.env.CONNECTION_STRING, { connectTimeoutMS: 2_000 });
  } catch (error) {
    console.error("Failed to connect to mongoose.");
  }
}