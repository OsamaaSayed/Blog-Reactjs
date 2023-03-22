import React from "react";
import { Link } from "react-router-dom";

function PostCard({ title, content, id }) {
  return (
    <>
      {/* *********** Card *********** */}
      <div className="container w-[700px] mx-auto my-4">
        <div className="card md:card-side bg-formColor shadow-xl my-4 justify-center items-center">
          <figure className="w-full md:w-2/5">
            <Link to={`/post/${id}`}>
              <img
                className="w-full h-[23rem] object-cover"
                src="src/assets/Images/1.jpg"
                alt="Album"
              />
            </Link>
          </figure>

          <div className="card-body w-full justify-evenly md:w-3/5">
            <Link to={`/post/${id}`}>
              <h2 className="card-title">{title}</h2>
            </Link>

            <Link to={`/post/${id}`}>
              <p className="flex-grow-0">{content}</p>
            </Link>

            <div className="card-actions justify-between items-end mt-1">
              <div className="flex flex-col justify-center items-center">
                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                  <div className="w-14 rounded-full">
                    <img src="src/assets/user.svg" />
                  </div>
                </label>
                <span className="text-gray-300 text-xs capitalize">
                  Osama Sayed
                </span>
              </div>

              <span className="text-gray-400 text-sm">21 Mar, 2023</span>
            </div>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </>
  );
}

export default PostCard;
