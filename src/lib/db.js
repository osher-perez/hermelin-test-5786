// Connect to MongoDB
import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/postsDB";

export async function connectDB() {
  // If already connected, do nothing
  if (mongoose.connection.readyState === 1) return;
  // Connect to local MongoDB
  await mongoose.connect(MONGODB_URI);
}
