import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyPost = () => {
  const { user } = useAuth();
  const { data: posts = [], refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/posts/${user?.email}`);
      console.log(data);
      return data;
    },
  });
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/post/delete/${id}`);
      console.log(data);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      refetch();
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
        console.log(id);
        await mutateAsync(id);
      }
    });
  };
  return (
    <div className="my-10">
      <div className="text-center text-3xl font-semibold my-7">
        <h1>My Post</h1>
      </div>
      <div className="lg:ml-72 ">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Post Title</th>
                <th>Votes</th>
                <th>Comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr key={idx} className="">
                  <th>{idx + 1}</th>
                  <td>{post.title}</td>
                  <td>{post.upVote - post.downVote}</td>
                  <td>
                    <Link to={`/comments/${post._id}`} className="bg-[#1af041] px-3 py-1 rounded-md text-white">
                      Comment
                    </Link>
                  </td>
                  <td className=" ">
                    <button onClick={() => handleDelete(post._id)}>
                      <MdDeleteForever
                        className="ml-3 text-red-500"
                        size={24}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPost;
