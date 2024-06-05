import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaUsers } from "react-icons/fa";
import { TfiComments } from "react-icons/tfi";
import { GrDatabase } from "react-icons/gr";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import PieChar from "../../Components/Dashboard/PieChar";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: adminData = {} } = useQuery({
    queryKey: ["Admin"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    },
  });

  const { data: adminStats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stats");
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ( tag ) => {
      const { data } = await axiosSecure.post("/tags",  {category:tag} );
      return data;
    },
    onSuccess: () => {
      toast.success("Tag added successfully");
    },
  });
  const handleAddTag =async (e) => {
    e.preventDefault();
    const tag = e.target.tag.value;
    await mutateAsync(tag);
  };

  return (
    <div>
      <div className=" mt-6">
        <div className="max-w-xl shadow-lg mx-auto p-8 sm:flex sm:space-x-6 ">
          <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
            <img
              src={adminData.image}
              alt=""
              className="object-cover object-center w-full h-full rounded bg-gray-500"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">{adminData.name}</h2>
              <span className="text-sm text-gray-400">Admin</span>
            </div>
            <div className="space-y-1">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Email address"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                  ></path>
                </svg>
                <span className="text-gray-400">{adminData.email}</span>
              </span>
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Phonenumber"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                  ></path>
                </svg>
                <span className="text-gray-400">+25 381 77 983</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 w-9/12  mx-auto">
        <div className="flex w-full justify-center ">
          <form onSubmit={handleAddTag}>
            <input
              type="text"
              name="tag"
              className="border-2  outline-none w-96 py-1 px-2 rounded-md"
              placeholder="Enter a tag"
            />
            <button
              type="submit"
              className="bg-green-400 ml-4 px-2 py-1 rounded-md text-white"
            >
              Add Tag
            </button>
          </form>
        </div>
      </div>
      <div>
        <section className="p-6 my-6 shadow-lg">
          <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex p-4 items-center space-x-4 rounded-lg md:space-x-6 bg-[#f6bd607c]">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 ">
                <FaUsers size={36} />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">
                  {adminStats.totalUsers}
                </p>
                <p className="capitalize">Users</p>
              </div>
            </div>
            <div className="flex p-4 items-center space-x-4 rounded-lg md:space-x-6 bg-[#f7ede2]">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 ">
                <TfiComments size={36} />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">
                  {adminStats.totalComments}
                </p>
                <p className="capitalize">Comments</p>
              </div>
            </div>
            <div className="flex items-center p-4 space-x-4 rounded-lg md:space-x-6 bg-[#f5cac3]">
              <div className="flex  justify-center p-2 align-middle rounded-lg sm:p-4 ">
                <GrDatabase size={24} />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">
                  {adminStats.totalPosts}
                </p>
                <p className="capitalize">Posts</p>
              </div>
            </div>
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-[#83c5be]">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 ">
                <MdOutlineWorkspacePremium size={36} />
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">
                  {adminStats.payments}
                </p>
                <p className="capitalize">Subscribers</p>
              </div>
            </div>
          </div>
          <div>
            <PieChar adminStats={adminStats}></PieChar>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminProfile;
