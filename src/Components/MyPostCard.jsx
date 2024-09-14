import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const MyPostCard = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`} className="block">
      <div className="bg-green-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">
              {new Date(post.time).toDateString()}
            </span>
            <a className="px-3 py-1 font-semibold rounded bg-[#9ef01a] text-gray-900 text-sm">
              {post?.tag}
            </a>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold hover:underline">
              {post.title}
            </h3>
            <p className="mt-2 text-gray-700">
              {post.description.slice(0, 96)}
              {post.description.length > 96 ? "..." : ""}
            </p>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1 border-2 border-green-400 px-2 py-1 rounded-full hover:bg-green-50">
                <span className="font-semibold">{post.upVote}</span>
                <BiUpvote size={18} />
              </div>
              <div className="flex items-center space-x-1 border-2 border-red-400 px-2 py-1 rounded-full hover:bg-red-50">
                <span className="font-semibold">{post.downVote}</span>
                <BiDownvote size={18} />
              </div>
              <div className="flex items-center space-x-1 border-2 border-gray-300 px-2 py-1 rounded-full hover:bg-gray-50">
                <span className="font-semibold">{post.commentsCount}</span>
                <FaRegCommentAlt size={18} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={post.author.image || "/default-avatar.png"} // Default image if none provided
                alt="author avatar"
                className="object-cover w-10 h-10 rounded-full bg-gray-200"
              />
              <span className="text-sm font-medium text-gray-700 hover:underline">
                {post.author.name}
              </span>
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
