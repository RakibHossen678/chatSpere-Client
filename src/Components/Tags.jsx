import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const Tags = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: Tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/categories");
      return data;
    },
  });

  const handleTag = (tag) => {
    let currentQuery = {
      tag: tag,
    };
    const url = queryString.stringifyUrl({
      url: "/",
      query: currentQuery,
    });
    navigate(url);
  };

  return (
    <div className="my-20 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-gray-800">
          Explore Posts by Tags
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center my-20">
          <FiLoader className="animate-spin" color="#36d7b7" size={60} />
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 grid-cols-3 gap-4 text-center my-10">
          {Tags.map((tag, idx) => (
            <button
              onClick={() => handleTag(tag.category)}
              className="bg-green-100 py-6 px-4 hover:scale-105 hover:bg-green-300 transition-transform duration-300 ease-in-out rounded-md shadow-lg"
              key={idx}
            >
              <h1 className="text-xl font-bold text-gray-700">
                {tag.category}
              </h1>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tags;
