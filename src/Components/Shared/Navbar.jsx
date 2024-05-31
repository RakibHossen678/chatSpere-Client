import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../assets/forumLogo.png";

const Navbar = () => {
  const navLinks = (
    <>
      <ul className="menu menu-horizontal px-1">
        <li>
          <a>Home</a>
        </li>

        <li>
          <a>Membership</a>
        </li>
      </ul>
    </>
  );
  return (
    <div className="px-8">
      <div className="navbar bg-base-100">
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
            <img className="w-14" src={logo} alt="" />
            <h1>ChatSphere</h1>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end ">
          <div>
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
          </div>
          <div>
            <IoMdNotificationsOutline className="mr-2" size={28} />
          </div>
          <a className="bg-[#70e000] hover:bg-[#9ef01a] text-white px-6 py-2 font-medium rounded-full">
            Join US
          </a>
          {/* <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Rakib</a>
              </li>
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
