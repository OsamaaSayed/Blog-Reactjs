import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Modal({
  postId,
  selectedCard,
  handleUpdatePost,
  handleCloseClick,
  loading,
}) {
  // ----------- States -----------
  const [title, setTitle] = useState(selectedCard.title);
  const [content, setContent] = useState(selectedCard.content);

  // -------- For form validation -----------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ----------- Handlers ------------
  const changeTitleInput = (e) => {
    setTitle(e.target.value);
  };
  const changeContentInput = (e) => {
    setContent(e.target.value);
  };



  return (
    <div>

      {/* The Modal Body */}
      <input
        type="checkbox"
        id="my-modal-5"
        className="modal-toggle"
      />

      <div id="modal" className="modal">
        <div className="modal-box w-full max-w-5xl">
          <h3 className="font-bold text-xl text-center">Update Post</h3>

          <form
            onSubmit={handleSubmit((data) => handleUpdatePost(data, postId))}
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
              value={title}
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
              value={content}
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
              accept="image/*"
              className="file-input file-input-bordered rounded-none w-full focus:outline-none border-gray-200 my-2"
            />
            <p className="text-red-600">{errors.photo?.message}</p>

            <div className="modal-action">
              <label
                onClick={handleCloseClick}
                htmlFor="my-modal-5"
                className="btn"
              >
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
    </div>
  );
}
