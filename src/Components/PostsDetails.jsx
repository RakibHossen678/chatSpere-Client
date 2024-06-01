import { Link, Navigate, useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";

const PostsDetails = () => {
  const {user}=useAuth()
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
  const handleAddComment=async(e,postTitle,authorName)=>{
    e.preventDefault()
    if(!user) return <Navigate to='/'></Navigate>
    const form=e.target
    const comment=form.opinion.value
    console.log(postTitle,authorName,comment)
    
  }
  console.log(post);
  return (
    <div className="pt-28 w-9/12 mx-auto ">
      <div className="relative">
        <h1 className="flex items-center space-x-2">
          <Link
            to="/"
            className=" absolute -left-10 bg-slate-100 px-3 rounded-full py-3"
          >
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
          <a className="flex items-center border-2 px-2 rounded-full  hover:bg-green-200">
            <span>{post.upVote}</span>
            <span>
              <BiUpvote />
            </span>
          </a>
          <a className="flex items-center border-2 px-2 rounded-full  hover:bg-red-200">
            <span>{post.downVote}</span>
            <span>
              <BiDownvote />
            </span>
          </a>
          <a className="flex items-center border-2 px-2 rounded-full  space-x-1">
            <span>
              <FiShare />
            </span>
            <span>Share</span>
          </a>
        </div>
        <div className="w-7/12 my-4">
          <form onSubmit={()=>handleAddComment(post?.title,post?.author?.email)} className="flex items-center space-x-3">
            <input
              type="text"
              name="opinion"
              placeholder="Add a comment"
              className="block w-full  mt-2 placeholder-gray-400/70 dark:placeholder-gray-500  border  bg-white px-5 py-2.5 text-gray-700  focus:outline-none focus:ring f focus:ring-opacity-40 rounded-full  dark:text-gray-300 "
            />
            <button type="submit" className="bg-[#70e000] px-4 py-2 text-white rounded-full">
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostsDetails;
