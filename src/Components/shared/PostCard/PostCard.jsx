import { Link } from "react-router-dom";

import DeleteCard from "../DeleteCard/DeleteCard";
import EditCard from "./../EditCard/EditCard";

function PostCard({
  title,
  content,
  id,
  name,
  createdAt,
  photo,
  flag,
  userPostId,
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
      <div
        className={`${
          flag ? "w-[1000px]" : ""
        } container w-[700px] mx-auto my-4 overflow-hidden`}
      >
        <div
          className={`${
            flag ? "md:flex-col" : ""
          } card md:card-side bg-formColor shadow-xl my-4 justify-center items-center`}
        >
          <figure className={`${flag ? "md:w-full" : ""} w-full md:w-2/5`}>
            <Link to={`/post/${id}`} className="w-full">
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
              <Link to={`/post/${id}`}>
                <h2 className="card-title">{title}</h2>
              </Link>
            </div>

            <div>
              <Link to={`/post/${id}`}>
                <p className="flex-grow-0">{content}</p>
              </Link>
            </div>

            <div className="card-actions justify-between items-center mt-1">
              <div className="flex flex-col justify-center ">
                <span className="text-gray-300 text-sm capitalize">{name}</span>
                <span className="text-gray-400 text-xs">{swapDate}</span>
              </div>

              {userPostId === userId ? (
                <div className="flex gap-2">
                  <EditCard />
                  <DeleteCard />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </div>
    </>
  );
}

export default PostCard;
