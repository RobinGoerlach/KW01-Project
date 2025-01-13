/**
 * File: server.js
 * Description: A simple HTTP server integrated with MongoDB using Mongoose.
 *              Provides a RESTful API for managing posts, including CRUD operations.
 *              Posts are stored in a MongoDB Atlas database.
 * Author: Robin Goerlach
 */

import http from "http"; // Import the HTTP module to create a web server
import mongoose from "mongoose"; // Import Mongoose to interact with MongoDB
import dotenv from "dotenv"; // Import dotenv to load environment variables
dotenv.config(); // Load .env file

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit if the connection fails
  });

// Define the Post schema for MongoDB
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

// Create the Post model
const Post = mongoose.model("Post", postSchema);

// Request handler function that processes all incoming HTTP requests
const requestHandler = async (req, res) => {
  const singlePostRegex = /^\/posts\/[0-9a-fA-F]{24}$/; // Regex to match routes like /posts/<id>
  const { method, url } = req; // Extract the HTTP method and URL from the request object

  // Handle requests to the /posts route
  if (url === "/posts") {
    // Handle GET /posts: Return all posts
    if (method === "GET") {
      try {
        const posts = await Post.find(); // Fetch all posts from the database
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(posts));
      } catch (error) {
        res.statusCode = 500; // Internal Server Error
        return res.end(JSON.stringify({ error: "Failed to retrieve posts" }));
      }
    }

    // Handle POST /posts: Add a new post
    if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString(); // Collect data chunks
      });
      req.on("end", async () => {
        try {
          const { title, content } = JSON.parse(body);
          if (!title || !content) {
            res.statusCode = 400; // Bad Request
            return res.end(
              JSON.stringify({ error: "Title and content are required" })
            );
          }
          const newPost = new Post({ title, content }); // Create a new post document
          const savedPost = await newPost.save(); // Save the post to the database
          res.statusCode = 201; // Created
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(savedPost));
        } catch (error) {
          res.statusCode = 400; // Bad Request
          return res.end(JSON.stringify({ error: "Invalid data" }));
        }
      });
      return;
    }

    res.statusCode = 405; // Method Not Allowed
    return res.end(JSON.stringify({ error: "Invalid method for /posts" }));
  }

  // Handle requests to the /posts/<id> route
  if (singlePostRegex.test(url)) {
    const postId = url.split("/")[2]; // Extract the post ID from the URL

    // Handle GET /posts/<id>: Return a specific post
    if (method === "GET") {
      try {
        const post = await Post.findById(postId); // Find the post by ID
        if (!post) {
          res.statusCode = 404; // Not Found
          return res.end(JSON.stringify({ error: "Post not found" }));
        }
        res.statusCode = 200; // OK
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(post));
      } catch (error) {
        res.statusCode = 500; // Internal Server Error
        return res.end(
          JSON.stringify({ error: "Failed to retrieve the post" })
        );
      }
    }

    // Handle PUT /posts/<id>: Update a specific post
    if (method === "PUT") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        try {
          const { title, content } = JSON.parse(body);
          if (!title || !content) {
            res.statusCode = 400; // Bad Request
            return res.end(
              JSON.stringify({ error: "Title and content are required" })
            );
          }
          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content },
            { new: true, runValidators: true }
          );
          if (!updatedPost) {
            res.statusCode = 404; // Not Found
            return res.end(JSON.stringify({ error: "Post not found" }));
          }
          res.statusCode = 200; // OK
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(updatedPost));
        } catch (error) {
          res.statusCode = 400; // Bad Request
          return res.end(JSON.stringify({ error: "Invalid data" }));
        }
      });
      return;
    }

    // Handle DELETE /posts/<id>: Delete a specific post
    if (method === "DELETE") {
      try {
        const deletedPost = await Post.findByIdAndDelete(postId); // Delete the post by ID
        if (!deletedPost) {
          res.statusCode = 404; // Not Found
          return res.end(JSON.stringify({ error: "Post not found" }));
        }
        res.statusCode = 204; // No Content
        return res.end(); // Empty response
      } catch (error) {
        res.statusCode = 500; // Internal Server Error
        return res.end(JSON.stringify({ error: "Failed to delete the post" }));
      }
    }

    res.statusCode = 405; // Method Not Allowed
    return res.end(JSON.stringify({ error: "Invalid method for /posts/<id>" }));
  }

  // If the route does not match, return Invalid Route
  res.statusCode = 404; // Not Found
  return res.end(JSON.stringify({ error: "Invalid route" }));
};

// Create the server using the request handler function
const server = http.createServer(requestHandler);

// Define the port number the server will listen on
const port = 3000;

// Start the server and log a message indicating it's running
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
