import { useEffect, useState } from "react";
import Select from "react-select";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Addpost = () => {
  const [member, setMember] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/categories`);
      return data;
    },
  });

  const options = categories.map((category) => ({
    value: category.category,
    label: category.category,
  }));

  const { data: badge = {} } = useQuery({
    queryKey: ["badge"],
    queryFn: async () => {
      if (user) {
        const { data } = await axiosSecure(`/badge/${user?.email}`);
        return data;
      }
    },
  });

  const userBadge = badge.badge?.badge;
  const postCount = badge?.postCount;

  const { mutateAsync } = useMutation({
    mutationKey: ["post"],
    mutationFn: async (postData) => {
      const { data } = await axiosSecure.post("/post", postData);
      return data;
    },
    onSuccess: () => {
      toast.success("Post Added Successfully");
      navigate("/dashboard/myPost");
    },
    onError: () => {
      toast.error("Failed to add post. Please try again.");
    },
  });

  const onSubmit = async (data) => {
    if (selectedOption) {
      const tag = selectedOption.value;
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

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div>
      <Helmet>
        <title>ChatSphere || Add Post</title>
      </Helmet>
      {member ? (
        <div className="py-10  min-h-screen">
          <section className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Add New Post
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-gray-700 mb-2">Post Title</label>
                  <input
                    id="title"
                    placeholder="Enter post title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Post Description
                  </label>
                  <input
                    id="description"
                    placeholder="Enter post description"
                    type="text"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Tag</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="Select a tag"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Author Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: "Author name is required",
                    })}
                    defaultValue={user?.displayName}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Author Image
                  </label>
                  <input
                    id="image"
                    type="text"
                    defaultValue={user?.photoURL}
                    {...register("photo", {
                      required: "Author image is required",
                    })}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Author Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Author email is required",
                    })}
                    defaultValue={user?.email}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="px-8 py-3 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                >
                  Add Post
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <section className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
            <p className="text-sm font-medium text-blue-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </p>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Post Limit Exceeded
            </h1>
            <p className="text-gray-600 mb-6">
              You have reached your post limit. Please subscribe to add more
              posts.
            </p>
            <Link to="/payment">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200">
                Become a Member
              </button>
            </Link>
          </section>
        </div>
      )}
    </div>
  );
};

export default Addpost;
