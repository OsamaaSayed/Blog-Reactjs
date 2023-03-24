import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

import PostCard from "../../Components/shared/PostCard/PostCard";
import ServerError from "./../../Pages/ServerError/ServerError";

export default function PostContainer() {
  const token = localStorage.getItem("token");

  //for Authorization
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // ---------------- States ----------------
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // ---------------- Effects ----------------
  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/v1/post?limit=1000"
        );
        setPosts(data.data);
      } catch (error) {
        setError(error);
      }
    }

    getPosts();
  }, []);

  // --------------- Handlers ----------------
  const deletePostHandler = async (postId) => {
    try {
      // to delete the post
      const { data } = await axios.delete(
        `http://localhost:3001/v1/post/${postId}`,
        config
      );

      // to render the new data
      const response = await axios.get(
        "http://localhost:3001/v1/post?limit=1000"
      );
      setPosts(response.data.data);

      // Success pop up
      toast.success("Deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {

      // Error pop up
      toast.error('sorry.., something went wrong. Please try again later', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });

    }
  };

  return (
    <>
      {posts.length ? (
        posts.map((post) => (
          <PostCard
            key={post._id}
            postId={post._id}
            title={post.title.substring(0, 50) + "..."}
            content={post.content.substring(0, 70) + "..."}
            photo={post.photo}
            name={post.user?.username}
            userPostId={post.user?._id}
            createdAt={post.createdAt}
            deletePostHandler={deletePostHandler}
          />
        ))
      ) : !posts.length && !error ? (
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
        ""
      )}


      {error ? <ServerError /> : ""}

      {/*  Delete Post success */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />

      {/* Delete Post Error */}
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        theme="dark"
      />
    </>
  );
}
