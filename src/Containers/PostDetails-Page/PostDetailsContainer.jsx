import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostCard from "./../../Components/PostCard/PostCard";

export default function PostDetailsContainer() {
  const { id } = useParams();

  // ---------------- States ----------------
  const [post, setPost] = useState({});



  // ---------------- Effects ----------------
  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(`http://localhost:3010/posts/${id}`);
        setPost(data);
      } catch (error) {
        console.log("error", error);
      }
    }

    getPosts();
  }, []);

  return (
    <>
      
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
        />
     
    </>
  );
}
