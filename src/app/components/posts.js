"use client";

import { useEffect, useState } from "react";
import "./posts.css"; // ← חיבור העיצוב

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState("");

  async function loadPosts() {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleAddPost(e) {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, title, content, likes })
    });

    const newPost = await res.json();
    setPosts((prev) => [...prev, newPost]);

    setAuthor("");
    setTitle("");
    setContent("");
    setLikes("");
  }

  async function handleDeletePost(id) {
    await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p._id !== id));
  }

  const longestPost =
    posts.length > 0
      ? posts.reduce((max, p) =>
          p.content.length > max.content.length ? p : max
        )
      : null;

  return (
    <div className="posts-container">
      <h1>All Posts</h1>

      <form className="add-form" onSubmit={handleAddPost}>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="number"
          placeholder="Likes"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        />
        <button className="add-btn" type="submit">Add Post</button>
      </form>

      {posts.map((p) => (
        <div key={p._id} className="post-card">
          <div className="post-title">{p.title}</div>
          <div className="post-author">By: {p.author}</div>
          <div className="post-content">{p.content}</div>
          <div>Likes: {p.likes}</div>
          <button className="delete-btn" onClick={() => handleDeletePost(p._id)}>
            Delete
          </button>
        </div>
      ))}

      {longestPost && (
        <p className="longest-text">
          The Most Long Post is with the title – {longestPost.title} of {longestPost.author}
        </p>
      )}
    </div>
  );
}
