import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../assets/forumLogo.png";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user,logOut } = useAuth();
  const navLinks = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>

      <li>
        <a>Membership</a>
      </li>
    </>
  );
  return (
    <div className="shadow-xl ">
      <div className="navbar fixed  bg-[#0d1b2a66] lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="flex items-center">
            <img className="lg:w-14 w-8" src={logo} alt="" />
            <h1 className="lg:text-3xl text-xl font-bold bg-gradient-to-r from-[#70e000] via-[#9ef01a] to-green-400 text-transparent bg-clip-text animate-gradient">
              ChatSphere
            </h1>
          </a>
        </div>
        <div className="navbar-center "></div>
        <div className="navbar-end ">
          <div className="hidden lg:flex">
            <ul className="space-x-7 menu-horizontal px-1 text-white">
              {navLinks}
            </ul>
          </div>
          <div>
            <IoMdNotificationsOutline className="mx-4 text-white" size={28} />
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">{user.displayName}</a>
                </li>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <button onClick={()=>logOut()}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#70e000] hover:bg-[#9ef01a] text-white px-6 py-2 font-medium rounded-full"
            >
              Join US
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
