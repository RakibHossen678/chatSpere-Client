import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const MyPostCard = ({post}) => {
  return (
    <Link to={`/post/${post._id}`}>
      <div className="py-6 text-black">
        <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm bg-green-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {new Date(post.time).toDateString()}
            </span>
            <a className="px-2 py-1 font-semibold rounded bg-[#9ef01a] text-gray-900">
              {post.tag}
            </a>
          </div>
          <div className="mt-3">
            <a className="text-2xl font-bold hover:underline">{post.title}</a>
            <p className="mt-2">{post.description.slice(0, 96)}......</p>
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
    </Link>
  );
};
MyPostCard.propTypes = {
  post: PropTypes.obj,
};
export default MyPostCard;
