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
  // console.log(announcements);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/payment">Membership</NavLink>
      </li>
    </>
  );
  return (
    <div className="shadow-xl ">
      <div className="navbar fixed  bg-[#0d1b2a66] lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" text-white lg:hidden">
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
          <Link to="/" className="flex items-center">
            <img className="lg:w-14 w-8" src={logo} alt="" />
            <h1 className="lg:text-3xl text-xl font-bold bg-gradient-to-r from-[#70e000] via-[#9ef01a] to-green-400 text-transparent bg-clip-text animate-gradient">
              ChatSphere
            </h1>
          </Link>
        </div>
        <div className="navbar-center "></div>
        <div className="navbar-end ">
          <div className="hidden lg:flex">
            <ul className="space-x-7 menu-horizontal px-1 text-white">
              {navLinks}
            </ul>
          </div>
          <div>
            <Button onClick={open} className="relative">
              <IoMdNotificationsOutline className="mx-4 text-white" size={28} />
              <p className="absolute text-white bg-green-400 px-2 -top-3 right-0 rounded-full">
                {announcements.length}
              </p>
            </Button>

            <Transition appear show={isOpen}>
              <Dialog
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={close}
              >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4">
                    <TransitionChild
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 transform-[scale(95%)]"
                      enterTo="opacity-100 transform-[scale(100%)]"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 transform-[scale(100%)]"
                      leaveTo="opacity-0 transform-[scale(95%)]"
                    >
                      <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl">
                        <div className="overflow-y-auto h-96 ">
                          {announcements.map((announcement, idx) => (
                            <div
                              key={idx}
                              className="flex items-center rounded shadow-md overflow-hidden max-w-xl relative my-5 bg-green-100"
                            >
                              <div className="self-stretch flex items-center px-3 flex-shrink-0 ">
                                <img
                                  className="w-10 h-10 rounded-3xl"
                                  src={announcement.authorImage}
                                />
                              </div>
                              <div className="p-4 flex-1">
                                <h3 className="text-xl font-bold">
                                  {announcement.title}
                                </h3>
                                <p className="text-sm ">
                                  {announcement.description}
                                </p>
                              </div>
                              <button className="absolute top-2 right-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="h-4 w-4 p-2 rounded cursor-pointer"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </Transition>
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
              Join US
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
