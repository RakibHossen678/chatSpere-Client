import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

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
    <div className="w-11/12 md:w-8/12 lg:w-7/12 mx-auto p-6">
      <Helmet>
        <title>ChatSphere || Announcement </title>
      </Helmet>
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">Add Announcement</h1>
      </div>
      <section className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Author Name</label>
              <input
                id="name"
                defaultValue={user?.displayName}
                type="text"
                {...register("name", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Author Image URL</label>
              <input
                id="image"
                type="text"
                defaultValue={user?.photoURL}
                {...register("image", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                id="title"
                type="text"
                {...register("title", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <input
                id="description"
                type="text"
                {...register("description", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2.5 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Make Announcement
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Announcement;
