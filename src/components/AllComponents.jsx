import React, { useState, useEffect } from "react";
import { deletePost } from "../api/postapi";
import Search from "./Search";

function Allcomponets({ data }) {
  const [posts, setPosts] = useState(data); // Store posts in state

  useEffect(() => {
    setPosts(data); // Update posts if data changes
  }, [data]); // Re-run when `data` updates

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id)); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };


  return (
    <>
    <Search data={posts} setData={setPosts} />
    <ul>
      {posts.map((item) => (
        <li key={item.id} className="list-unstyled">
          <div className="grid mb-4 mt-3">
            <div className="card w-50" style={{ backgroundColor: "#1152ae", color: "#fff" }}>
              <div className="card-body">
                <h5 className="card-title">{item.id}</h5>
                <h5 className="card-title">Title: {item.title}</h5>
                <p className="card-text">{item.body}</p>
                <a href="#" className="btn btn-warning">Edit</a>
                <button className="btn btn-danger ms-3" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
    </>
  );
}

export default Allcomponets;