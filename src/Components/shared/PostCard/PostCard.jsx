import { Link } from "react-router-dom";

import DeleteCard from "../DeleteCard/DeleteCard";
import EditCard from "./../EditCard/EditCard";

import male from '/male.svg'
import female from '/female.svg'
import unknown from '/unknown.svg'

export default function PostCard({
  title,
  content,
  postId,
  name,
  createdAt,
  photo,
  flag,
  userPostId,
  deletePostHandler,
  updatePostHandler,
  post,
  loading,
}) {
  
  const userId = localStorage.getItem("userId");
  const gender = localStorage.getItem("gender");

  // -- to get the image object --
  const [image] = photo;

  //---- displaying the date of post in dd mm yy ----
  let date = new Date(createdAt);
  date = date.toDateString().substring(4);
  const swapDate = date.replace(/(\w+)\s(\w+)/, "$2 $1");

  return (
    <>
      {/* *********** Card *********** */}
      <div className="container md:w-3/5 lg:w-1/2 mx-auto overflow-hidden">
        <div
          className={`${
            flag ? "md:flex-col" : ""
          } card md:card-side bg-formColor shadow-xl justify-center items-center`}
        >
          <figure className={`${flag ? "md:w-full" : ""} w-full md:w-2/5`}>
            <Link to={`/post/${postId}`} className="w-full">
              <img
                className="w-full h-[23rem] object-cover"
                src={image.url}
                alt="Album"
              />
            </Link>
          </figure>

          <div
            className={`${
              flag ? "md:w-full" : ""
            } card-body w-full justify-evenly md:w-3/5 overflow-hidden`}
          >
            <div>
              <Link to={`/post/${postId}`}>
                <h2 className="card-title">{title}</h2>
              </Link>
            </div>

            <div>
              <Link to={`/post/${postId}`}>
                <p className="flex-grow-0">{content}</p>
              </Link>
            </div>

            <div className="card-actions justify-between items-end mt-1">
              <div className="flex justify-center items-end ">
                
                <div className="flex flex-col justify-center">
                  <span className="text-gray-300 text-sm capitalize">
                    {name}
                  </span>
                  <span className="text-gray-400 text-xs">{swapDate}</span>
                </div>
                
              </div>

              {userPostId === userId ? (
                <div className="flex gap-2">
                  <EditCard
                    postId={postId}
                    updatePostHandler={updatePostHandler}
                    post={post}
                    loading={loading}
                  />
                  <DeleteCard
                    postId={postId}
                    deletePostHandler={deletePostHandler}
                    loading={loading}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="divider my-2"></div>
      </div>
    </>
  );
}

