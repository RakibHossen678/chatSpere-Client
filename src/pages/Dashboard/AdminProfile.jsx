import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaUsers } from "react-icons/fa";
import { TfiComments } from "react-icons/tfi";
import { GrDatabase } from "react-icons/gr";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import PieChar from "../../Components/Dashboard/PieChar";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

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
    mutationFn: async (tag) => {
      const { data } = await axiosSecure.post("/tags", { category: tag });
      return data;
    },
    onSuccess: () => {
      toast.success("Tag added successfully");
    },
  });

  const handleAddTag = async (e) => {
    e.preventDefault();
    const tag = e.target.tag.value;
    await mutateAsync(tag);
  };

  return (
    <div className=" min-h-screen">
      <Helmet>
        <title>ChatSphere || Admin Profile</title>
      </Helmet>
      <div className="container mx-auto p-6">
        {/* Admin Profile Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 w-32 h-32 mb-4 md:mb-0 md:w-40 md:h-40">
            <img
              src={adminData.image}
              alt="Admin Profile"
              className="object-cover w-full h-full rounded-full border-4 border-gray-300"
            />
          </div>
          <div className="flex flex-col items-start md:ml-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {adminData.name}
            </h2>
            <p className="text-sm text-gray-600">Admin</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                  ></path>
                </svg>
                <span>{adminData.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                  ></path>
                </svg>
                <span>+25 381 77 983</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Tag Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <form
            onSubmit={handleAddTag}
            className="flex flex-col md:flex-row items-center justify-center"
          >
            <input
              type="text"
              name="tag"
              className="border-2 border-gray-300 rounded-md py-2 px-4 mb-4 md:mb-0 md:mr-4 w-full md:w-80"
              placeholder="Enter a tag"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
            >
              Add Tag
            </button>
          </form>
        </div>

        {/* Statistics Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center p-4 bg-[#f6bd607c] rounded-lg shadow-sm">
              <FaUsers size={36} className="text-gray-700" />
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-800">
                  {adminStats.totalUsers}
                </p>
                <p className="text-sm text-gray-600">Users</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-[#f7ede2] rounded-lg shadow-sm">
              <TfiComments size={36} className="text-gray-700" />
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-800">
                  {adminStats.totalComments}
                </p>
                <p className="text-sm text-gray-600">Comments</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-[#f5cac3] rounded-lg shadow-sm">
              <GrDatabase size={24} className="text-gray-700" />
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-800">
                  {adminStats.totalPosts}
                </p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-[#83c5be] rounded-lg shadow-sm">
              <MdOutlineWorkspacePremium size={36} className="text-gray-700" />
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-800">
                  {adminStats.payments}
                </p>
                <p className="text-sm text-gray-600">Subscribers</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <PieChar adminStats={adminStats} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminProfile;
