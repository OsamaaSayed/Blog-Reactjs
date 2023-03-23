import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostCard from "../../Components/shared/PostCard/PostCard";

export default function PostDetailsContainer() {

  const flag = true;

  // for getting id from url
  const { id } = useParams();

  // ---------------- States ----------------
  const [post, setPost] = useState({});



  // ---------------- Effects ----------------
  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(`http://localhost:3001/v1/post/${id}`);
        console.log(data.data);
        setPost(data.data);
      } catch (error) {
        console.log("error", error);
      }
    }

    getPosts();
  }, []);

  return (
    <>



      {Object.keys(post).length?
      
      <PostCard
          key={post._id}
          id={post._id}
          title={post.title}
          content={post.content}
          photo = {post.photo}
          name ={post.user.username}
          date = {post.createdAt}
          flag={flag}
        /> : (
          <>
            
            <div className="container mx-auto text-center">
            <h1>Please wait...</h1>
            </div>
            
          </>
        )}



     
    </>
  );
}
