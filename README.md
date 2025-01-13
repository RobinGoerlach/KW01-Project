# Node.js HTTP Server with React Client

A simple HTTP server built with Node.js using the core `http` module. This project demonstrates basic CRUD operations for a `/posts` resource, using in-memory data storage. Additionally, a React client will be added to provide a user-friendly interface for interacting with the server.

## Features

- Basic RESTful API for managing posts
- Supports `GET`, `POST`, `PUT`, and `DELETE` operations
- In-memory data storage for simplicity
- React client for a dynamic and interactive user experience

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [React](https://reactjs.org/) for the client (to be added later)

### Setup and Run the Server

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. Install dependencies (if any):
   ```bash
   npm install

3. Start the server:
   ```bash
   npm start

4. For development (with auto-restart on file changes):
   ```bash
   npm run dev

The server will run on http://localhost:3000.


## API Endpoints

Create a new post. Requires a JSON body with title and content.
   ```javascript
   POST /posts

Retrieve all posts.
   ```javascript
   GET /posts

Retrieve a specific post by ID.
   ```javascript
   GET /posts/:id

Update a specific post. Requires a JSON body with title and content.
   ```javascript
   PUT /posts/:id

Delete a specific post by ID.
   ```javascript
   DELETE /posts/:id

## Adding the React Client
The React client will be used to interact with the backend server via the above API. Follow these steps to set up the client:

Create a React app in the same project directory:
Navigate to the client folder and start the React development server:

  ```bash
  mkdir client && cd client
  npm create vite@latest . --template react
  npm install
  npm install react-router-dom
  npm install -D tailwindcss postcss autoprefixer
  npm install @fortawesome/fontawesome-free daisyui
  npm install prop-types

Modify client/src to add components for listing, creating, updating, and deleting posts.
  ```bash
  npm start

Future Improvements
Persist data using a database (e.g., MongoDB or PostgreSQL)
Implement authentication and authorization
Add error handling and input validation on both client and server
License
This project is licensed under the ISC License.

Author
Robin Goerlach
