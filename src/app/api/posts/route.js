// API routes for posts
import { connectDB } from "@/lib/db";
import Post from "@/models/post";
// Get all posts
export async function GET() {
  await connectDB(); // Connect to DB
  const posts = await Post.find(); // Get all posts
  return Response.json(posts); // Return posts as JSON
}

// Create new post
export async function POST(request) {
  await connectDB(); // Connect to DB
  const body = await request.json(); // Get body from request

  // Create new post in DB
  const newPost = await Post.create({
    author: body.author,
    title: body.title,
    content: body.content,
    likes: Number(body.likes) || 0
  });

  return Response.json(newPost); // Return created post
}

// Delete post by id (from query string: /api/posts?id=...)
export async function DELETE(request) {
  await connectDB(); // Connect to DB
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Get id from URL

  // Delete post from DB
  await Post.findByIdAndDelete(id);

  return Response.json({ message: "Post deleted" }); // Return success message
}
