import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostCard from "../../Components/shared/PostCard/PostCard";

import { ThreeDots } from 'react-loader-spinner';

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
          name ={post.user?.username}
          userPostId={post.user?._id}
          createdAt = {post.createdAt}
          flag={flag}
        /> : (
          <>
            
            <div className="container mx-auto text-cente h-screen flex justify-center items-center">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#661AE6"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
            
          </>
        )}



     
    </>
  );
}
