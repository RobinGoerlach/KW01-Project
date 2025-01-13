import React, { useState, useEffect } from "react";
import Post from "./Post";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const editPost = (post) => {
    console.log("Edit post:", post); // Placeholder for editing logic
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onEdit={editPost}
          onDelete={deletePost}
        />
      ))}
    </div>
  );
};

export default PostList;
