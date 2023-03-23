import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../../Components/shared/PostCard/PostCard";

export default function PostContainer() {
  // ---------------- States ----------------
  const [posts, setPosts] = useState([]);

  // ---------------- Effects ----------------
  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/v1/post?limit=1000"
        );
        console.log(data.data);
        setPosts(data.data);
      } catch (error) {
        console.log("error", error);
      }
    }

    getPosts();
  }, []);

  return (
    <>
      {posts.length ? (
        posts.map((post) => (
          <PostCard
            key={post._id}
            id={post._id}
            title={post.title.substring(0, 50) + "..."}
            content={post.content.substring(0, 70) + "..."}
            photo={post.photo}
            name={post.user.username}
            date={post.createdAt}
          />
        ))
      ) : !posts?(
        <>
          
          <div className="container mx-auto text-center">
          <h1>Blog Is Empty...</h1>
          </div>
          
        </>
      ):(
        <>
          
          <div className="container mx-auto text-center">
          <h1>Please wait...</h1>
          </div>
          
        </>
      )}
    </>
  );
}
