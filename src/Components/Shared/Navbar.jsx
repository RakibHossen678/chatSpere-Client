import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../assets/forumLogo.png";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import {
  Button,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut } = useAuth();
  let [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/announcement");
      return data;
    },
  });

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="hover:text-green-400 transition duration-300">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/payment"
          className="hover:text-green-400 transition duration-300"
        >
          Membership
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="shadow-md">
      <nav className="navbar fixed top-0 w-full bg-[#0d1b2a66] lg:px-8 px-4 py-4 backdrop-blur-md z-20">
        <div className="navbar-start flex items-center">
          <div className="dropdown">
            <button className="lg:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </button>
            <ul className="menu dropdown-content mt-2 p-2 shadow bg-white rounded-box w-52">
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <img className="lg:w-14 w-8" src={logo} alt="Logo" />
            <h1 className="lg:text-3xl text-xl font-bold text-white">
              ChatSphere
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" menu-horizontal space-x-8 text-white">{navLinks}</ul>
        </div>
        <div className="navbar-end flex items-center gap-4">
          <Button onClick={open} className="relative">
            <IoMdNotificationsOutline className="text-white" size={28} />
            <p className="absolute text-xs text-white bg-[#70e000] w-6 h-6 rounded-full flex items-center justify-center -top-3 -right-2">
              {announcements.length}
            </p>
          </Button>

          <Transition appear show={isOpen}>
            <Dialog as="div" className="relative z-20" onClose={close}>
              <div className="fixed inset-0 bg-black bg-opacity-50"></div>
              <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 transform scale-95"
                  enterTo="opacity-100 transform scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 transform scale-100"
                  leaveTo="opacity-0 transform scale-95"
                >
                  <DialogPanel className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
                    <div className="overflow-y-auto h-72">
                      {announcements.length > 0 ? (
                        announcements.map((announcement, idx) => (
                          <div
                            key={idx}
                            className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md flex items-start"
                          >
                            <img
                              src={announcement.authorImage}
                              alt="author"
                              className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">
                                {announcement.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {announcement.description}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500">No announcements</p>
                      )}
                    </div>
                    <div className="text-right mt-4">
                      <Button className="text-white bg-[#70e000] px-4 py-2 rounded-md" onClick={close}>
                        Close
                      </Button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Dialog>
          </Transition>

          {user ? (
            <div className="dropdown dropdown-end">
              <button className="btn btn-ghost btn-circle avatar">
                <img
                  className="w-10 h-10 rounded-full"
                  src={user?.photoURL}
                  alt="User Avatar"
                />
              </button>
              <ul className="dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                <li>
                  <a className="justify-between">{user.displayName}</a>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={() => logOut()}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#70e000] hover:bg-[#9ef01a] text-white px-6 py-2 font-medium rounded-full"
            >
              Join Us
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
