import logo from "../../assets/forumLogo.png";
import { FaFacebookF, FaGithub, FaReddit, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
      <footer  className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="container px-6 py-8 mx-auto">
          <div className="flex flex-col items-center text-center">
            <a className="flex items-center mb-4">
              <img className="lg:w-14 w-8" src={logo} alt="ChatSphere Logo" />
              <h1 className="lg:text-3xl text-xl font-bold bg-gradient-to-r from-[#70e000] via-[#9ef01a] to-green-400 text-transparent bg-clip-text animate-gradient ml-2">
                ChatSphere
              </h1>
            </a>

            <div className="flex flex-wrap justify-center mt-6 -mx-4">
              <a
                href="#home"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Home"
              >
                Home
              </a>

              <a
                href="#membership"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Membership"
              >
                Membership
              </a>

              <a
                href="#dashboard"
                className="mx-4 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                aria-label="Dashboard"
              >
                Dashboard
              </a>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-4 sm:mb-0">
              © Copyright 2024. All Rights Reserved.
            </p>

            <div className="flex -mx-2 mt-4 sm:mt-0">
              <a
                href="https://reddit.com"
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-green-500"
                aria-label="Reddit"
              >
                <FaReddit className="w-5 h-5" />
              </a>

              <a
                href="https://facebook.com"
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-green-500"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>

              <a
                href="https://github.com"
                className="mx-2 text-gray-600 transition-colors duration-300  hover:text-green-500 "
                aria-label="Github"
              >
                <FaGithub className="w-5 h-5" />
              </a>

              <a
                href="mailto:support@chatsphere.com"
                className="mx-2 text-gray-600 transition-colors duration-300  hover:text-green-500 "
                aria-label="Email"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-lg font-semibold text-gray-700  mb-4">
              Stay Updated
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
              Subscribe to our newsletter to get the latest updates and offers.
            </p>
            <form className="flex flex-col sm:flex-row items-center justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 mb-2 sm:mb-0 sm:mr-2 border border-gray-300 rounded-lg d"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 "
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
