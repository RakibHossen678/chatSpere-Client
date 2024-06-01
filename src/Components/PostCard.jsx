import { BiDownvote, BiUpvote } from "react-icons/bi";
import { CgComment } from "react-icons/cg";
import { FaRegCommentAlt } from "react-icons/fa";

const PostCard = ({ post }) => {
  return (
    <div>
      <div className="py-6 text-black">
        <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm bg-green-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {new Date(post.time).toDateString()}
            </span>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-2 py-1 font-bold rounded bg-violet-400 text-gray-900"
            >
              {post.tag}
            </a>
          </div>
          <div className="mt-3">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-2xl font-bold hover:underline"
            >
              {post.title}
            </a>
            <p className="mt-2">{post.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
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
                <FaRegCommentAlt />
                </span>
              </a>
            </div>
            <div>
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center"
              >
                <img
                  src={post.author.image}
                  alt="avatar"
                  className="object-cover w-10 h-10 mx-4 rounded-full bg-gray-500"
                />
                <span className="hover:underline text-gray-400">
                  {post.author.name}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
