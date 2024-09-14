import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyPostCard from "../../Components/MyPostCard";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {} } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data;
    },
  });

  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/posts/${user?.email}`);
      return data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>ChatSphere || My Profile</title>
      </Helmet>
      <div className="lg:max-w-2xl mx-auto mt-20">
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={profile.image || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full oobject-cover bg-gray-300 border-4 border-green-400"
            />
            <div className="absolute bottom-0 right-0 bg-green-400 text-white text-xs font-semibold px-2 py-1 rounded-tr-full">
              {profile?.badge || "No Badge"}
            </div>
          </div>

          {/* Profile Information */}
          <div className="mt-4 text-center">
            <h1 className="text-2xl font-semibold mb-1">
              {profile?.name || "Name not available"}
            </h1>
            <h2 className="text-lg text-gray-600">
              {profile?.email || "Email not available"}
            </h2>
          </div>
        </div>
      </div>
      <div className="my-20">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold py-4">My Recent Activity</h2>
          {posts.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-4">
                You haven't posted anything yet.
              </p>
              <Link
                to="/dashboard/addPost"
                className="inline-block px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                Create a Post
              </Link>
            </div>
          ) : (
            <div>
              {posts.slice(0, 3).map((post, idx) => (
                <MyPostCard key={idx} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
