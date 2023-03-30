import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-up";

import PostCard from "../../Components/shared/PostCard/PostCard";
import Modal from "./../../Components/Modal/Modal";
import ServerError from "./../../Pages/ServerError/ServerError";

// ------ BACKEND API --------
import { BASE_URL } from "./../../Service/API";

export default function PostContainer() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("username");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  
  // ---------------- States ----------------
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, SetLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [postId, setPostId] = useState(null);

  // ---------------- Effects ----------------
  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(`${BASE_URL}/v1/post?limit=1000`);
        setPosts(data.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }

    getPosts();
  }, []);

  // --------------- Handlers ----------------
  const handleDeletePost = async (postId, modal) => {
    console.log(postId);
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

  const handleUpdatePost = async (data, postId) => {
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

  const handleDeleteClick = (postId) => {
    console.log(postId);
    setPostId(postId);
  };

  const handleEditClick = (event, post, postId) => {
    event.target.classList.add("modal-open");
    setSelectedCard(post);
    setPostId(postId);
  };

  const handleCloseClick = () => {
    setSelectedCard(null);
  };


  // reference for scrolling to section
  const sectionRef = useRef();

  return (
    <>
      {posts.length ? (
        <>
          {/* // Header */}
          <div className="hero min-h-screen bg-bgHome mb-12">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold text-white">
                  Hello {name?.split(" ")[0]}
                </h1>
                <p className="mb-5">
                  Welcome to ReactBlog! We're excited to have you here.
                </p>
                <button
                  onClick={() => {
                    sectionRef.current.scrollIntoView({ behavior: "smooth" });
                  }}
                  className=" btn btn-primary"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Card */}
          <div
            ref={sectionRef}
            className=" w-[95%] mx-auto grid gap-x-6 gap-y-1 justify-center items-center 2xsm:grid-cols-1  md:grid-cols-3"
          >
            {posts.map((post) => (
              <PostCard
                key={post._id}
                postId={post._id}
                title={post.title.substring(0, 50) + "..."}
                content={post.content.substring(0, 70) + "..."}
                photo={post.photo}
                name={post.user?.username}
                userPostId={post.user?._id}
                createdAt={post.createdAt}
                handleDeletePost={handleDeletePost}
                handleUpdatePost={handleUpdatePost}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                post={post}
                loading={loading}
              />
            ))}
          </div>
        </>
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

      {/* ------- Button to scroll to top --------- */}
      <ScrollToTop
        showUnder={200}
        duration={500}
        style={{
          transitionDuration: "0.3s",
          transitionTimingFunction: "linear",
          transitionDelay: "0s",
        }}
      >
        <button className="transition-all duration-200 ease-in-out hover:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
            />
          </svg>
        </button>
      </ScrollToTop>

      {/* ------- to open Modal ---------- */}
      {selectedCard && (
        <Modal
          selectedCard={selectedCard}
          postId={postId}
          handleUpdatePost={handleUpdatePost}
          handleCloseClick={handleCloseClick}
          loading={loading}
        />
      )}
    </>
  );
}
