import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { MdDeleteForever } from "react-icons/md";

const MyPost = () => {
  const { user } = useAuth();
  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/posts/${user?.email}`);
      return data;
    },
  });
  return (
    <div className="my-10">
      <div className="text-center text-3xl font-semibold my-7">
        <h1>My Post</h1>
      </div>
      <div className="ml-72 ">
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
              {posts.map((post,idx) => (
                <tr key={idx} className="">
                  <th>{idx+1}</th>
                  <td>{post.title}</td>
                  <td>{post.upVote-post.downVote}</td>
                  <td>
                    <button className="bg-[#1af041] px-3 py-1 rounded-md text-white">Comment</button>
                  </td>
                  <td className=" ">
                  <MdDeleteForever className="ml-3 text-red-500" size={24} />
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
