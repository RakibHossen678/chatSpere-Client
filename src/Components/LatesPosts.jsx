import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const LatesPosts = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: posts = [] } = useQuery({
    queryKey: ["posts",currentPage, itemsPerPage,],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/posts?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });
  // console.log(posts);
  const { data: postCount = {} } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/usersCount`);
      setCount(data.count);
      return data;
    },
  });
  console.log(count);

  const PageCount = Math.ceil(count / itemsPerPage);
  const pages = [...Array(PageCount).keys()].map((element) => element + 1);
  const handlePaginationButton = (value) => {
    console.log(value);
    setCurrentPage(value);
  };
  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Latest Posts</h1>
      </div>
      <div className="my-10">
        {posts.map((post, idx) => (
          <PostCard key={idx} post={post}></PostCard>
        ))}
      </div>
      <div>
        <div className="flex justify-center my-5">
          <button
            disabled={currentPage == 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className="flex items-center px-4 py-2 mx-1 text-gray-900 rounded-md cursor-pointer bg-green-300"
          >
            previous
          </button>
          {pages.map((page, idx) => (
            <button
              onClick={() => handlePaginationButton(page)}
              key={idx}
              className={`items-center  hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-green-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage == 2}
            onClick={() => handlePaginationButton(currentPage + 1)}
            className="flex items-center px-4 py-2 mx-1 text-gray-900 rounded-md cursor-pointer bg-green-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatesPosts;
