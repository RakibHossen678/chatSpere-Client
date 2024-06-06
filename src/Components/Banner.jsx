import { useState } from "react";
import queryString from "query-string";

const Banner = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    let currentQuery = {
      search: search,
    };
    const url = queryString.stringifyUrl({
      url: "/",
      query: currentQuery,
    });
    console.log(url)
  };
  return (
    <div className="">
      <div className="hero z-0 bg-[#03045e] min-h-screen">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center ">
          <div className="max-w-3xl ">
            <h1 className="mb-5 lg:text-4xl font-bold text-white">
              Welcome to the Community Forum - Connect, Share, and Grow!
            </h1>
            <div className="lg:w-8/12 mx-auto">
              <form onSubmit={handleSearch} className="w-full space-x-2">
                <input
                  className="w-9/12 py-3 te px-2 rounded-md border-none outline-none"
                  type="text"
                  name="search"
                  placeholder="Search For Topics...."
                />
                <button
                  type="submit"
                  className="font-medium  bg-[#70e000] text-white py-3 px-4 rounded-md"
                >
                  Search
                </button>
              </form>
            </div>
            <div className="text-white flex items-center justify-center py-6 lg:space-x-4">
              <h1>Popular topics :</h1>
              <ul className="flex space-x-4 items-center">
                <li className="border-2 lg:px-3 px-2 py-1 rounded-full">
                  WordPress
                </li>
                <li className="border-2 lg:px-3 px-2 py-1 rounded-full">
                  Getting
                </li>
                <li className="border-2 lg:px-3 px-2 py-1 rounded-full">
                  Footer
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
