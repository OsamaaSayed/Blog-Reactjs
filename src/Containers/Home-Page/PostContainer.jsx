import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

import PostCard from "../../Components/shared/PostCard/PostCard";
import ServerError from "./../../Pages/ServerError/ServerError";

export default function PostContainer() {
  //BACKEND API
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // ---------------- States ----------------
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, SetLoading] = useState(false);

  // ---------------- Effects ----------------
  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(`${BASE_URL}/v1/post?limit=1000`);
        setPosts(data.data);
      } catch (error) {
        setError(error);
      }
    }

    getPosts();
  }, []);

  // --------------- Handlers ----------------
  const deletePostHandler = async (postId, modal) => {
    // Start button loading
    SetLoading(true);
    try {
      // to delete the post
      await axios.delete(`${BASE_URL}/v1/post/${postId}`, config);

      // Stop button loading
      SetLoading(false);

      // to render the new data
      const response = await axios.get(`${BASE_URL}/v1/post?limit=1000`);
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

      // Close Modal
      modal.style.display = "none";
    } catch (error) {
      // Stop button loading
      SetLoading(false);
      console.log("error", error);
      // Error pop up
      toast.error("Sorry.., something went wrong. Please try again later", {
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

  const updatePostHandler = async (data, postId, modal) => {
    // Start button loading
    SetLoading(true);

    // The new data
    const { title, content, photo } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("photo", photo[0]);

    try {
      // to edit the data
      await axios.patch(`${BASE_URL}/v1/post/${postId}`, formData, config);

      // Stop button loading
      SetLoading(false);

      // to render the new data
      const response = await axios.get(`${BASE_URL}/v1/post?limit=1000`);
      setPosts(response.data.data);

      // Success pop up
      toast.success("Updated successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

      // Clsoe Modal
      modal.style.display = "none";
    } catch (error) {
      // Stop button loading
      SetLoading(false);

      // Error pop up
      toast.error(`${error.response.data.message} 😞`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
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

  <div className="mt-28 mb-11">
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
            updatePostHandler={updatePostHandler}
            post={post}
            loading={loading}
          />
        ))
      )
       : !posts.length && !error ? (
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
      </div>



      {error ? <ServerError /> : ""}

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
    </>
  );
}
