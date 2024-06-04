import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Announcement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const { mutateAsync } = useMutation({
    mutationFn: async (announcementData) => {
      const { data } = await axiosSecure.post(
        "/announcement",
        announcementData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Announcement added successfully");
    },
  });
  const onSubmit = async (data) => {
    const announcementData = {
      authorName: data.name,
      authorImage: data.image,
      title: data.title,
      description: data.description,
    };
    await mutateAsync(announcementData);
    console.log(announcementData);
  };
  
  return (
    <div className="w-6/12 mx-auto items-center flex-col">
      <div className="text-center">
        <h1 className="text-4xl mt-14 pb-6">Add Announcement</h1>
      </div>
      <div>
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Author Name
                </label>
                <input
                  id="name"
                  defaultValue={user?.displayName}
                  type="text"
                  {...register("name", { required: true })}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
                  {...register("image", { required: true })}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { required: true })}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  {...register("description", { required: true })}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-green-500 rounded-md focus:outline-none ">
                Make Announcement
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Announcement;
