import { useState } from "react"; // Import useState from React
import PostList from "./components/PostList";
import NewPost from "./components/NewPost";

const App = () => {
  const [refreshPosts] = useState(false);

  const handlePostAdded = () => {
    setRefreshPosts(!refreshPosts, setRefreshPosts); // Trigger a re-fetch of posts
  };

  return (
    <>
      <div className="bg-blue-500 text-white p-4 text-center">
        This is a test for TailwindCSS.
      </div>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">Post Manager</h1>
        <NewPost onPostAdded={handlePostAdded} />
        <PostList key={refreshPosts} /> {/* Key forces re-render */}
      </div>
    </>
  );
};

export default App;
