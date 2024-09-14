import { FaRegCommentAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
const PostCard = ({ post }) => {
  return (
    <Link to={`/post/${post?._id}`} className="block">
      <div className="py-6 text-black">
        <div className="container max-w-4xl px-6 py-4 mx-auto rounded-lg shadow-md bg-green-50 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500">
              {new Date(post?.time).toDateString()}
            </span>
            <a className="px-3 py-1 font-semibold rounded bg-[#9ef01a] text-gray-900 text-sm">
              {post?.tag}
            </a>
          </div>
          <div className="mt-2">
            <a className="text-xl font-semibold hover:underline">
              {post.title}
            </a>
            <p className="mt-2 text-gray-700">
              {post?.description.slice(0, 96)}......
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-4">
              <a className="flex items-center border-2 px-3 py-1 rounded-full border-green-400 hover:bg-green-100 transition-colors duration-300">
                <span className="mr-1 font-medium">
                  {post?.upVote - post?.downVote}
                </span>
                <AiOutlineLike className="text-lg" />
              </a>
              <a className="flex items-center border-2 px-3 py-1 rounded-full border-green-400 hover:bg-green-100 transition-colors duration-300">
                <span className="mr-1 font-medium">{post?.commentsCount}</span>
                <FaRegCommentAlt className="text-lg" />
              </a>
            </div>
            <div className="flex items-center">
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center hover:underline"
              >
                <img
                  src={post?.author?.image}
                  alt="avatar"
                  className="object-cover w-12 h-12 mx-3 rounded-full bg-gray-500"
                />
                <span className="text-gray-600 text-sm">
                  {post?.author?.name}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
PostCard.propTypes = {
  post: PropTypes.obj,
};
export default PostCard;
