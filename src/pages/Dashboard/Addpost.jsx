import { useEffect, useState } from "react";
import Select from "react-select";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Addpost = () => {
  const [member, setMember] = useState(true);
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const { data: categories = [] } = useQuery({
    queryKey: ["Admin"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/categories`);
      return data;
    },
  });
  console.log(categories);
  // const categories = [
  //   "MERN",
  //   "Express",
  //   "React",
  //   "MongoDB",
  //   "Node.js",
  //   "Redux",
  //   "Firebase",
  //   "CSS",
  //   "Testing",
  //   "GraphQL",
  //   "JavaScript",
  // ];
  const options = categories.map((category) => ({
    value: category.category,
    label: category.category,
  }));
  console.log(options);
  const { data: badge = {} } = useQuery({
    queryKey: ["badge"],
    queryFn: async () => {
      if (user) {
        const { data } = await axiosSecure(`/badge/${user?.email}`);
        return data;
      }
    },
  });
  console.log(user.email);
  const userBadge = badge.badge?.badge;
  const postCount = badge?.postCount;

  const { mutateAsync } = useMutation({
    mutationKey: ["post"],
    mutationFn: async (postData) => {
      const { data } = await axiosSecure.post("/post", postData);
      console.log(data);
    },
    onSuccess: () => {
      toast.success("Post Added Successfully");
    },
  });

  const onSubmit = async (data) => {
    if (selectedOption) {
      const tag = selectedOption.value;
      console.log(data);
      const postData = {
        author: {
          name: data.name,
          image: data.photo,
          email: data.email,
        },
        title: data.title,
        description: data.description,
        tag: tag,
        upVote: 0,
        downVote: 0,
        time: new Date(),
      };

      await mutateAsync(postData);
    }
  };
 
  useEffect(() => {
    if (userBadge === "bronze" && postCount >= 5) {
      setMember(false);
    }
  }, [userBadge, postCount]);
  console.log(member, userBadge, postCount);
  return (
    <div>
      {member ? (
        <div className="lg:py-40  py-10 ">
          <section className="max-w-4xl p-6  bg-white rounded-md shadow-md dark:bg-gray-800 ">
            <div>
              <h2 className="text-3xl pb-5 font-semibold text-gray-700 capitalize dark:text-white text-center">
                Add Post
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700 dark:text-gray-200">
                      Post Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      {...register("title", { required: true })}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-[#9ef01aa4] focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 dark:text-gray-200">
                      Post Description
                    </label>
                    <input
                      id="description"
                      type="text"
                      {...register("description", { required: true })}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-[#9ef01aa4] focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 dark:text-gray-200 ">
                      Tag
                    </label>
                    <Select
                      className="pt-3"
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 dark:text-gray-200">
                      Author Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register("name", { required: true })}
                      defaultValue={user?.displayName}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-[#9ef01aa4] focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 dark:text-gray-200">
                      Author Image
                    </label>
                    <input
                      id="image"
                      type="text"
                      defaultValue={user?.photoURL}
                      {...register("photo", { required: true })}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-[#9ef01aa4] focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 dark:text-gray-200">
                      Author Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", { required: true })}
                      defaultValue={user?.email}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-[#9ef01aa4] focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                  </div>
                </div>

                <div className="flex   justify-center mt-6">
                  <button className="px-20 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#9ef01a] rounded-md  focus:outline-none ">
                    Add Post
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <section className="bg-white dark:bg-gray-900 ">
            <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
              <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                  You have exceeded your post limit
                </h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Please subscribe for more posts
                </p>

                <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                  <Link to="/payment">
                    <button className="w-1/2 px-5 py-2  tracking-wide text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto hover:bg-green-500 dark:hover:bg-green-500 dark:bg-green-500">
                      Become a Member
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Addpost;
