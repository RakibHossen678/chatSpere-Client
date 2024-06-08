import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import Share from "./Share";
import { Helmet } from "react-helmet-async";

const PostsDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const {
    data: post = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/post/${id}`);
      return data;
    },
  });

  //save comment
  const { mutateAsync } = useMutation({
    mutationKey: ["comment"],
    mutationFn: async (commentData) => {
      const { data } = await axiosSecure.post("/comment", commentData);
      console.log(data);
    },
    onSuccess: () => {
      toast.success("Thanks for comment");
    },
  });

  const handleAddComment = async (e, postTitle, authorEmail) => {
    e.preventDefault();
    if (user) {
      const form = e.target;
      const comment = form.opinion.value;
      const commentData = {
        postTitle,
        authorEmail,
        comment,
      };
      await mutateAsync(commentData);
      form.reset()
    } else {
      toast.error("Please Login to comment");
      navigate("/login");
    }
  };

  const { mutateAsync: updateVote } = useMutation({
    mutationKey: ["vote"],
    mutationFn: async (vote) => {
      const { data } = await axiosSecure.patch(`/post/${vote}/${post._id}`);
      console.log(data);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleUpVote = async (vote) => {
    updateVote(vote);
  };
  const handleDownVote = async (vote) => {
    updateVote(vote);
  };

  if (isLoading || !user)
    return (
      <div className="w-16 absolute top-28 left-10 flex justify-center m-auto  h-16 border-4 rounded-full animate-spin border-[#9ef01a]"></div>
    );
  return (
    <div className="pt-28 lg:w-9/12 w-10/12 mx-auto mb-10">
      <Helmet>
        <title>ChatSphere || Post Details </title>
      </Helmet>
      <div className="relative">
        <h1 className="flex items-center space-x-2">
          <Link
            to="/"
            className=" absolute lg:-left-10 -left-8 bg-slate-100 px-3 rounded-full py-3"
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
          <button
            onClick={() => handleUpVote("upVote")}
            className="flex items-center border-2 px-2 rounded-full  hover:bg-green-200"
          >
            <span>{post?.upVote}</span>
            <span>
              <BiUpvote />
            </span>
          </button>
          <button
            onClick={() => handleDownVote("downVote")}
            className="flex items-center border-2 px-2 rounded-full  hover:bg-red-200"
          >
            <span>{post?.downVote}</span>
            <span>
              <BiDownvote />
            </span>
          </button>
          <div>
            <Share id={post._id}></Share>
          </div>
        </div>
        <div className="lg:w-7/12 my-4">
          <form
            onSubmit={(e) => handleAddComment(e, post?.title, user?.email)}
            className="flex items-center space-x-3"
          >
            <input
              type="text"
              name="opinion"
              placeholder="Add a comment"
              className="block w-full  mt-2 placeholder-gray-400/70 dark:placeholder-gray-500  border  bg-white px-5 py-2.5 text-gray-700  focus:outline-none focus:ring f focus:ring-opacity-40 rounded-full  dark:text-gray-300 "
            />
            <button
              type="submit"
              className="bg-[#70e000] px-4 py-2 text-white rounded-full"
            >
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostsDetails;
