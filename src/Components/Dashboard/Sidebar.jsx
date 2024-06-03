import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/forumLogo.png";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { MdReport } from "react-icons/md";
const Sidebar = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };
  const { data: userRole = "" } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data.role;
    },
  });
  console.log(userRole);
  return (
    <div>
      <div>
        <div className="bg-green-100 text-gray-800 flex justify-between md:hidden">
          <div>
            <div className="block cursor-pointer p-4 font-bold">
              <Link to="/">
                <a className="flex items-center">
                  <img className="lg:w-14 w-8" src={logo} alt="" />
                  <h1 className="lg:text-3xl text-xl font-bold bg-gradient-to-r from-[#70e000] via-[#9ef01a] to-green-400 text-transparent bg-clip-text animate-gradient">
                    ChatSphere
                  </h1>
                </a>
              </Link>
            </div>
          </div>

          <button
            onClick={handleToggle}
            className="mobile-menu-button p-4 focus:outline-none "
          >
            <FaBars className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-green-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          !isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className="h-screen  p-3 space-y-2 w-60 bg-green-100  ">
          <div className=" py-4 ">
            <div>
              <Link to="/" className="flex items-center">
                <img className="lg:w-14 w-8" src={logo} alt="" />
                <h1 className="lg:text-3xl text-xl font-bold bg-gradient-to-r from-[#70e000] via-[#9ef01a] to-green-400 text-transparent bg-clip-text animate-gradient">
                  ChatSphere
                </h1>
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-700">
            {!userRole === "admin" ? (
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li>
                  <NavLink
                    to="/dashboard"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <CgProfile size={24}></CgProfile>
                    <span>My Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="addPost"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <IoIosAddCircle size={24} />
                    <span>Add Post</span>
                  </NavLink>
                </li>
                <li>
                  <Link
                    to="myPost"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <IoDocumentTextOutline size={24} />
                    <span>My Posts</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li>
                  <NavLink
                    to="/dashboard"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <CgProfile size={24}></CgProfile>
                    <span>Admin Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="addPost"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <IoIosAddCircle size={24} />
                    <span>Manage Users</span>
                  </NavLink>
                </li>
                <li>
                  <Link
                    to="myPost"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <MdReport size={24} />
                    <span>Reported Comments</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="myPost"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <IoDocumentTextOutline size={24} />
                    <span>Make Announcement</span>
                  </Link>
                </li>
              </ul>
            )}
            <ul className="pt-4 pb-2 space-y-1  text-sm">
              <li>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current text-black"
                  >
                    <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                    <rect width="32" height="64" x="256" y="232"></rect>
                  </svg>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
