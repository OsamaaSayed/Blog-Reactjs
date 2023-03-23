import { Link, NavLink, useNavigate } from "react-router-dom";



export default function Header() {

  const isAuthenticated = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();


  // --------- Handlers --------
  const logOutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  
  return (
    <>
      <div className=" navbar justify-between bg-neutral-800 drop-shadow-lg">
        <div className="">

          <Link
            to="/"
            className=" ml-4 normal-case text-2xl hover:text-primary"
          >
            ReactBlog
          </Link>
        </div>

        <div className=" lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
             <NavLink to="/addPost">Add Post</NavLink>
            </li>
          </ul>
        </div>

        <div className="">

        <div>{username}</div>
          <div className="dropdown dropdown-end mr-4">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-14 rounded-full">
                <img src="src/assets/user.svg" />
              </div>
            </label>

            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral-800 rounded-box w-52"
            >
              {isAuthenticated ? (
                <>
                  <li>
                    <Link onClick={logOutHandler}>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register" className="justify-between">
                      Signup
                    </Link>
                  </li>

                  <li>
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
