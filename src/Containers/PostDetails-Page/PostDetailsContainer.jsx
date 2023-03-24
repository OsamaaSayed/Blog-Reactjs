import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../../Components/shared/PostCard/PostCard";
import { ToastContainer, toast } from "react-toastify";

import { ThreeDots } from "react-loader-spinner";
import ServerError from "../../Pages/ServerError/ServerError";

export default function PostDetailsContainer() {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate();

  // to make UI chanegs for post card
  const flag = true;

  // to get id from url
  const { id } = useParams();

  // ---------------- States ----------------
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);

  // ---------------- Effects ----------------
  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(`http://localhost:3001/v1/post/${id}`);
        console.log(data.data);
        setPost(data.data);
      } catch (error) {
        setError(error);
        console.log("error", error);
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

      // Success pop up
      toast.success("Deleted successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

      // navigate after the success pop finish
      setTimeout(() => {
        navigate("/");
      }, 2500);

    } catch (error) {
      // Error pop up
      toast.error("sorry.., something went wrong. Please try again later", {
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
      {Object.keys(post).length ? (
        <PostCard
          key={post._id}
          postId={post._id}
          title={post.title}
          content={post.content}
          photo={post.photo}
          name={post.user?.username}
          userPostId={post.user?._id}
          createdAt={post.createdAt}
          deletePostHandler={deletePostHandler}
          flag={flag}
        />
      ) : !Object.keys(post).length && !error ? (
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

      {/* Delete Post Success */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
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
