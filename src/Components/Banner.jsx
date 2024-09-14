import { useMutation, useQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Banner = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { mutateAsync } = useMutation({
    mutationFn: async (searchText) => {
      const { data } = await axiosPublic.post("/search", searchText);
      return data;
    },
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    const search = e.target.search.value;

    let currentQuery = {
      tag: search,
    };
    const url = queryString.stringifyUrl({
      url: "/",
      query: currentQuery,
    });
    navigate(url);
    const searchText = {
      search,
    };
    await mutateAsync(searchText);
  };

  const { data: searchText = [] } = useQuery({
    queryKey: ["searchText"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/search");
      return data;
    },
  });

  return (
    <div className="">
      <div
        className="hero z-0 min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #03045e 0%, #0077b6 50%, #00b4d8 100%)",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-70"></div>

        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="mb-5 lg:text-5xl text-3xl font-extrabold text-white tracking-wide">
              Welcome to the Community Forum - Connect, Share, and Grow!
            </h1>

            <div className="lg:w-8/12 w-full mx-auto drop-shadow-lg">
              <form
                onSubmit={handleSearch}
                className="w-full space-x-2 flex justify-center"
              >
                <input
                  className="w-9/12 py-3 px-4 rounded-md border-2 border-[#70e000] outline-none shadow-md focus:border-[#38b000] transition-all duration-300 ease-in-out"
                  type="text"
                  name="search"
                  placeholder="Search For Topics...."
                />

                <button
                  type="submit"
                  className="font-medium bg-[#70e000] hover:bg-[#38b000] transition-all duration-300 text-white py-3 px-5 rounded-md shadow-lg"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="text-white flex flex-col lg:flex-row items-center justify-center py-6 lg:space-x-4 space-y-4 lg:space-y-0">
              <h1 className="text-lg font-semibold">Popular topics:</h1>

              <ul className="flex space-x-4 items-center">
                {searchText.slice(0, 3).map((text, idx) => (
                  <li
                    key={idx}
                    className="border-2 border-white uppercase lg:px-4 px-3 py-2 rounded-full text-sm hover:bg-[#38b000] transition-all duration-300 ease-in-out"
                  >
                    {text.search}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
