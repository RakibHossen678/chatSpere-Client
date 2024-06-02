import { useState } from "react";
import Select from "react-select";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const categories = [
  "MERN",
  "Express",
  "React",
  "MongoDB",
  "Node.js",
  "Redux",
  "Firebase",
  "CSS",
  "Testing",
  "GraphQL",
];
const options = categories.map((category) => ({
  value: category,
  label: category,
}));

const Addpost = () => {
  const { register, handleSubmit } = useForm();
const axiosSecure=useAxiosSecure()
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);

  const {data:badge={},isLoading}=useQuery({
    queryKey:['badge'],
    queryFn:async()=>{
      const {data}=await axiosSecure(`/badge/${user?.email}`)
      return data
    }
    
  })
  console.log(badge.badge)

// const {mutateAsync}=  useMutation({
//     mutationKey:['post'],
//     mutationFn:async()=>{
//       const {data}=
//     }
//   })

  
  const onSubmit = (data) => {
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
      console.table(postData);

    }
  };
  if(isLoading){
    <p>Loading....</p>
  }
  return (
    <div className="lg:py-48 py-10 lg:ml-48">
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 ">
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
              <label className="text-gray-700 dark:text-gray-200 ">Tag</label>
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
            <button className="px-20 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#9ef01a] rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Add Post
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Addpost;
