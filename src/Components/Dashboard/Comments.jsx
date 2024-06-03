import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Select from "react-select";
import useAuth from "../../Hooks/useAuth";
const options = [
  { value: "spam", label: "Spam" },
  { value: "abusive", label: "Abusive Language" },
  { value: "irrelevant", label: "Irrelevant Content" },
];
const Comments = () => {
  const { loading, setLoading } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const axiosSecure = useAxiosPublic();
  const { postId } = useParams();
  console.log(postId);
  const { data: post = {}, isLoading: postLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/post/${postId}`);
      setLoading(false);
      return data;
    },
  });

  console.log(post?.title);

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", post?.title],
    enabled: !!post?.title,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/comment/${post?.title}`);
      setLoading(false);
      return data;
    },
  });
  console.log(comments);
    console.log(selectedOption);
  const handleClick = () => {
    console.log("clicked");
    selectedOption("null");
  };
  if (loading || isLoading || postLoading) {
    <p>loading..........</p>;
  }
  return (
    <div className="pt-32">
      <div className="text-center text-xl  font-semibold py-8">
        <h1>{post.title}</h1>
      </div>
      <div className="w-10/12 mx-auto">
        <div className="overflow-x-auto h-full">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Commenter Email</th>
                <th>Comment Text</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{comment.authorEmail}</td>
                  <td>
                    {comment.comment.length <= 20 ? (
                      comment.comment
                    ) : (
                      <>
                        {comment.comment.slice(0, 20)}...
                        <button
                          className="text-green-500 ml-2"
                          onClick={() =>
                            document.getElementById("my_modal_2").showModal()
                          }
                        >
                          Read More
                        </button>
                        <dialog id="my_modal_2" className="modal">
                          <div className="modal-box">
                            <p className="py-4">{comment.comment}</p>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form>
                        </dialog>
                      </>
                    )}
                  </td>
                  <td>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                    />
                  </td>
                  <td>
                    <button
                      onClick={handleClick}
                      disabled={!selectedOption}
                      className="bg-red-500 px-4 py-2 text-white rounded-lg"
                    >
                      Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comments;
