// Post model definition
import mongoose from "mongoose";

// Define the Post schema
const PostSchema = new mongoose.Schema({
  author: String,   // Post author name
  title: String,    // Post title
  content: String,  // Post content
  likes: Number     // Post likes count
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
// chack if model already exists to avoid OverwriteModelError