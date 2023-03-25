import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditCard({ postId, post, updatePostHandler, loading }) {
  // ---------- States --------------
  let [titleInput, setTitle] = useState("");
  let [contentInput, setContent] = useState("");
  let [photoInput, setPhoto] = useState("");
  let [modal, setModal] = useState(null);

  // -------- For form validation -----------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // --------- Handlers ----------------
  const getInputsValueHandler = (e, post) => {
    const { title, content, photo } = post;
    setTitle(title);
    setContent(content);
    // setPhoto(photo[0].url);
  };

  const changeTitleInput = (e) => {
    setTitle(e.target.value);
  };
  const changeContentInput = (e) => {
    setContent(e.target.value);
  };

  // ---------- Effects -----------------
  useEffect(() => {
    titleInput = document.getElementById("title").value;
    contentInput = document.getElementById("content").value;
    //  photoInput = document.getElementById("photo").value;

    // get modal to close it
    modal = document.getElementById("modal");
    setModal(modal);
  }, []);



  return (
    <>
      {/* The button to open modal */}
      <label
        onClick={(e) => {
          getInputsValueHandler(e, post);
        }}
        htmlFor="my-modal-5"
        className="text-yellow-500 hover:text-yellow-300 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </label>

      {/* The Modal Body */}
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div id="modal" className="modal">
        <div className="modal-box w-full max-w-5xl">
          <h3 className="font-bold text-xl text-center">Update Post</h3>

          <form
            onSubmit={handleSubmit((data) => updatePostHandler(data, postId,modal))}
          >
            <input
              {...register("title", {
                required: "Title is required",
                maxLength: { value: 70, message: "Max length 70" },
                minLength: { value: 5, message: "Min length 5" },
              })}
              type="text"
              name="title"
              id="title"
              value={titleInput}
              onChange={changeTitleInput}
              placeholder="Title"
              className="input input-lg input-bordered w-full my-2 text-lg focus:outline-none border-gray-200"
            />
            {<p className="text-red-600">{errors.title?.message}</p>}

            <textarea
              {...register("content", {
                required: "Description is required",
                minLength: { value: 10, message: "Min length 10" },
              })}
              name="content"
              id="content"
              value={contentInput}
              onChange={changeContentInput}
              placeholder="Brief description for your post"
              className="textarea textarea-lg textarea-bordered w-full resize-none my-2 text-lg focus:outline-none border-gray-200"
            ></textarea>
            <p className="text-red-600">{errors.content?.message}</p>

            <input
              {...register("photo", { required: "Image is required" })}
              type="file"
              name="photo"
              id="photo"
              // value={photoInput}
              accept="image/jpg, image/png , image/jpeg"
              className="file-input file-input-bordered rounded-none w-full focus:outline-none border-gray-200 "
            />
            <p className="text-red-600">{errors.photo?.message}</p>

            <div className="modal-action">
              <label htmlFor="my-modal-5" className="btn">
                Cancel
              </label>
              <button
                id="saveBtn"
                type="submit"
                htmlFor="my-modal-5"
                className={`${
                  loading ? "loading" : ""
                } btn btn-warning  text-white outline-none border-none hover:bg-yellow-400 w-24`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
