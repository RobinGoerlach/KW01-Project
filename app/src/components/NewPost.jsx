import { useState } from "react"; // Import useState from React
import axios from "axios";

const NewPost = ({ onPostAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = { title, content };
      const response = await axios.post("http://localhost:3000/posts", newPost);
      onPostAdded(response.data);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Content</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea textarea-bordered"
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Post
      </button>
    </form>
  );
};

export default NewPost;
