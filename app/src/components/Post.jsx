import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Post = ({ post, onEdit, onDelete }) => {
  return (
    <div className="card shadow-lg bg-base-100 p-4 mb-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700">{post.content}</p>
      <div className="flex justify-end mt-4 space-x-4">
        <button
          onClick={() => onEdit(post)}
          className="btn btn-sm btn-outline btn-primary"
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="btn btn-sm btn-outline btn-error"
        >
          <FaTrash className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
