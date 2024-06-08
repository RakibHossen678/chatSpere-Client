import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyPostCard from "../../Components/MyPostCard";
import { Helmet } from "react-helmet-async";

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
  console.log(profile);
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
        <title>ChatSphere || My Profile </title>
      </Helmet>
      <div className="lg:max-w-2xl mx-auto mt-20 ">
        <div className="flex flex-col justify-center  p-6 shadow-md rounded-xl sm:px-12 ">
          <img
            src={profile.image}
            alt=""
            className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
          />
          <div className="max-w-24 mx-auto text-center">
            <h1 className="uppercase mt-1 bg-green-400 px-4 rounded-full text-white py-1">
              {profile?.badge}
            </h1>
          </div>
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">
                <span>Name : </span>
                <span>{profile?.name}</span>
              </h2>
              <h2 className="text-xl font-semibold sm:text-2xl">
                <span>Email : </span>
                <span>{profile?.email}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="my-20">
        <div className="text-center">
          <h2 className="text-3xl font-semibold py-4">My Recent Activity</h2>
        </div>
        <div className="">
          {posts.slice(0, 3).map((post, idx) => (
            <MyPostCard key={idx} post={post}></MyPostCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
