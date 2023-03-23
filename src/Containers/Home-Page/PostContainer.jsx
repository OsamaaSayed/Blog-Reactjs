import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

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
            name={post.user?.username}
            userPostId={post.user?._id}
            createdAt={post.createdAt}
          />
        ))
      ) : !posts.length ? (
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
      ) : (
        <>
          <div className="container mx-auto text-center">
            <h1>Blog is empty...</h1>
          </div>
        </>
      )}
    </>
  );
}
