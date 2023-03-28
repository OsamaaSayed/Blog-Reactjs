import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const isAuthenticated = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const gender = localStorage.getItem("gender");
  const navigate = useNavigate();

  // --------- Handlers --------
  const logOutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("gender");
    navigate("/login");
  };

  // to close dropdown menu
  const handleClick = () => {
    const elem = document.activeElement;

    if (elem) {
      elem?.blur();
    }
  };

  return (
    <>
      <div className=" navbar justify-between drop-shadow-lg absolute top-0 left-0 right-0 z-[999]">
        <div className="">
          <Link
            to="/"
            className=" ml-4 normal-case text-2xl hover:text-primary"
          >
            ReactBlog
          </Link>
        </div>

        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/addPost">Add Post</NavLink>
            </li>
          </ul>
        </div>

        <div>
          <div>{username}</div>

          <div className="dropdown dropdown-end mr-4">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-14 rounded-full">
                {gender === "Male" ? (
                  <img src="/male.svg" />
                ) : gender === "Female" ? (
                  <img src="/female.svg" />
                ) : (
                  <img src="/unknown.svg" />
                )}
              </div>
            </label>

            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral-800 rounded-box w-52"
            >

              <div className="block md:hidden">
                <li onClick={handleClick}>
                  <Link to="/">Home</Link>
                </li>

                <li onClick={handleClick}>
                  <Link to="/addPost">Add Post</Link>
                </li>
              </div>

              {isAuthenticated ? (
                <>
                  <li onClick={handleClick}>
                    <Link onClick={logOutHandler}>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={handleClick}>
                    <Link to="/register" className="justify-between">
                      Signup
                    </Link>
                  </li>

                  <li onClick={handleClick}>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
