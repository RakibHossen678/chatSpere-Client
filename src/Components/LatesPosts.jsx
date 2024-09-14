import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FiLoader } from "react-icons/fi";

const LatesPosts = () => {
  const axiosPublic = useAxiosPublic();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useSearchParams();
  const search = params.get("tag") || "";
  const [sortText, setSortText] = useState("");

  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["posts", currentPage, itemsPerPage, search, sortText],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/posts?page=${currentPage}&size=${itemsPerPage}&search=${search}&sort=${sortText}`
      );
      return data;
    },
  });

  const { data: postCount = {}, isLoading: countLoading } = useQuery({
    queryKey: ["counts", search],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/postsCount?search=${search}`);
      setCount(data.count);
      return data;
    },
  });

  const PageCount = Math.ceil(count / itemsPerPage);
  const pages = [...Array(PageCount).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleSorting = (sortValue) => {
    setSortText(sortValue);
  };

  if (postsLoading || countLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FiLoader className="animate-spin" color="#36d7b7" size={60} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">Latest Posts</h1>
      </div>
      
      <div className="text-center mb-6">
        <button
          onClick={() => handleSorting("popularity")}
          className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition-colors"
        >
          Sort by Popularity
        </button>
      </div>

      <div className="my-10">
        {posts.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </div>

      <div className="flex justify-center my-8">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-2 bg-green-300 text-gray-800 rounded-md shadow-md hover:bg-green-400 disabled:opacity-50 transition-colors"
        >
          Previous
        </button>

        {pages.map((page, idx) => (
          <button
            key={idx}
            onClick={() => handlePaginationButton(page)}
            className={`px-4 py-2 mx-2 rounded-md shadow-md transition-colors ${
              page === currentPage
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-800 hover:bg-green-100'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === PageCount}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-2 bg-green-300 text-gray-800 rounded-md shadow-md hover:bg-green-400 disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LatesPosts;
