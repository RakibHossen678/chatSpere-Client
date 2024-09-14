import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyPost = () => {
  const { user } = useAuth();
  const { data: posts = [], refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/posts/${user?.email}`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/post/delete/${id}`);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your post has been deleted.",
        icon: "success",
      });
      refetch();
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the post.",
        icon: "error",
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(id);
      }
    });
  };

  return (
    <div className="my-10">
      <Helmet>
        <title>ChatSphere || My Posts</title>
      </Helmet>
      <div className="text-center text-3xl font-semibold my-7">
        <h1>My Posts</h1>
      </div>
      <div className=" p-6 rounded-lg ">
        {posts.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl">You have no posts yet.</p>
            <Link to="/dashboard/addPost">
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Create a Post
              </button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 border-b">
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Post Title</th>
                  <th className="px-4 py-2 text-left">Votes</th>
                  <th className="px-4 py-2 text-left">Comments</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, idx) => (
                  <tr key={post._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{post.title}</td>
                    <td className="px-4 py-2">{post.upVote - post.downVote}</td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/comments/${post._id}`}
                        className="bg-green-500 px-3 py-1 rounded-md text-white hover:bg-green-600"
                      >
                        Comment
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdDeleteForever size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPost;
