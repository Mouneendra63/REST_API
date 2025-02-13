import React, { useState, useEffect } from "react";
import { deletePost } from "../api/postapi";
import Search from "./Search";

function Allcomponents({ data }) {
  const [posts, setPosts] = useState(data); // Store posts in state
  const [title, setTitle] = useState(false); // Track edit mode
  const [content,setContent]=useState("");
  const [id,setId]=useState("");
  
  
  useEffect(() => {
    setPosts(data); // Update posts if data changes
  }, [data]); // Re-run when `data` updates

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = async (item) => {
    setTitle(true); // Correctly updates the state
    console.log(item);
    setContent(item.title);
    setId(item.body);
  };

  useEffect(() => {
    console.log("Title state updated:", title); // Debugging
  }, [title,content,id]);

  return (
    <>
      <Search data={posts} setData={setPosts} title={title} content={content} id={id} />
      <ul>
        {posts.map((item) => (
          <li key={item.id} className="list-unstyled">
            <div className="grid mb-4 mt-3">
              <div
                className="card w-50"
                style={{ backgroundColor: "#1152ae", color: "#fff" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{item.id}</h5>
                  <h5 className="card-title">Title: {item.title}</h5>
                  <p className="card-text">{item.body}</p>
                  <button className="btn btn-warning" onClick={()=>handleEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Allcomponents;