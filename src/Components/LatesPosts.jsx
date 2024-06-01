import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import PostCard from "./PostCard";

const LatesPosts = () => {
  const axiosPublic = useAxiosPublic();
  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/posts");
      return data;
    },
  });
  console.log(posts);
  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Latest Posts</h1>
      </div>
      <div className="my-10">
        {posts.map((post, idx) => (
          <PostCard key={idx} post={post}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default LatesPosts;
