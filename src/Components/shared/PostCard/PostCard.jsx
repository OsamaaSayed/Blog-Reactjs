import { Link } from "react-router-dom";

import DeleteCard from "../DeleteCard/DeleteCard";
import EditCard from "./../EditCard/EditCard";

export default function PostCard({
  title,
  content,
  postId,
  name,
  createdAt,
  photo,
  flag,
  userPostId,
  handleDeletePost,
  post,
  loading,
  handleEditClick
}) {
  const userId = localStorage.getItem("userId");

  // -- to get the image object --
  const [image] = photo;

  //---- displaying the date of post in dd mm yy ----
  let date = new Date(createdAt);
  date = date.toDateString().substring(4);
  const swapDate = date.replace(/(\w+)\s(\w+)/, "$2 $1");

  return (
    <>
      {/* *********** Card *********** */}
      <div className={`2xsm:w-[90%] mx-auto md:w-full ${flag? "md:w-[90%]" : '' }`}>
        <div
          className={`card card-compact h-[448px] bg-formColor shadow-xl overflow-hidden w-full ${
            flag ? "mx-auto w-full h-auto" : ""
          }`}
        >
          <figure>
            <Link to={`/post/${postId}`}>
              <img
                className={`w-full h-[260px] object-cover rounded-tl-2xl rounded-tr-2xl hover:scale-110 transition-all duration-200 ease-in-out ${
                  flag ? "h-[300px]" : ""
                }`}
                src={image.url}
                alt="blog"
              />
            </Link>
          </figure>

          <div className="card-body justify-between">
            <div>
              <div>
                <Link to={`/post/${postId}`}>
                  <h2 className="card-title mb-2 hover:text-gray-300 transition-all duration-200 ease-in-out">
                    {title}
                  </h2>
                </Link>
              </div>

              <div>
                <Link to={`/post/${postId}`}>
                  <p className="flex-grow-0 font-light">{content}</p>
                </Link>
              </div>
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
                    key={postId}
                    post={post}
                    postId={postId}
                    handleEditClick={handleEditClick}
                  />
                  <DeleteCard

                    postId={postId}
                    handleDeletePost={handleDeletePost}
                    loading={loading}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div
          className={`divider mt-2 mb-0 w-[95%] ${
            flag ? "w-[90%] mx-auto" : ""
          }`}
        ></div>
      </div>
    </>
  );
}
