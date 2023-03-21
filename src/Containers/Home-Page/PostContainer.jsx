import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./../../Components/PostCard/PostCard";

export default function PostContainer() {
  // ---------------- States ----------------
  const [posts, setPosts] = useState([]);

  // ---------------- Effects ----------------

  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get("http://localhost:3010/posts");
        setPosts(data);
      } catch (error) {
        console.log("error", error);
      }
    }


    getPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} title={post.title} content={post.content} />
      ))}
    </>
  );
}
