import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { FiShare } from "react-icons/fi";

const PostsDetails = () => {
  // const {data}=useLoaderData()
  // console.log(data)
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  console.log(id);
  const { data: post = {} } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/post/${id}`);
      return data;
    },
  });
  console.log(post);
  return (
    <div className="pt-28 w-9/12 mx-auto ">
      <div className="relative">
        <h1 className="flex items-center space-x-2">
          <Link to='/' className=" absolute -left-10 bg-slate-100 px-3 rounded-full py-3">
            <FaArrowLeftLong />
          </Link>
          <div className="flex items-center space-x-4">
            <span>
              <img
                className="w-12 h-12 rounded-full"
                src={post.author?.image}
                alt=""
              />
            </span>
            <div className="flex flex-col ">
              <span className="font-medium">{post?.author?.name}</span>
              <span>{new Date(post?.time).toDateString()}</span>
            </div>
          </div>
        </h1>
      </div>
      <div>
        <h1 className="text-4xl pt-4 pb-7">{post.title}</h1>
        <h1 className="text-lg max-w-4xl mb-6">{post.description}</h1>
      </div>
      <div>
        <div className="flex space-x-5">
          <a className="flex items-center border-2 px-2 rounded-full border-green-400 hover:bg-green-200">
            <span>{post.upVote}</span>
            <span>
              <BiUpvote />
            </span>
          </a>
          <a className="flex items-center border-2 px-2 rounded-full border-red-400 hover:bg-red-200">
            <span>{post.downVote}</span>
            <span>
              <BiDownvote />
            </span>
          </a>
          <a className="flex items-center border-2 px-2 rounded-full border-green-400 hover:bg-green-200 space-x-1">
            <span>{post.commentsCount}</span>
            <span>
              <FiShare />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostsDetails;
