import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: users = [] } = useQuery({
    queryKey: ["AllUsers", currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/users?page=${currentPage}&size=${itemsPerPage}`
      );

      return data;
    },
  });
  const { data: UserCount = {} } = useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const { data } = await axiosSecure("/usersCount");
      setCount(data.count);
      return data;
    },
  });
  console.log(count);

  const PageCount = Math.ceil(count / itemsPerPage);

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/user/role/${id}`, {
        role: "admin",
      });
      return data;
    },
    onSuccess: () => {
      toast.success(`User role change successfully`);
    },
  });
  const handleMakeAdmin = async (id, name) => {
    await mutateAsync(id, name);
  };
  const pages = [...Array(PageCount).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    console.log(value);
    setCurrentPage(value);
  };
  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-semibold py-9">Manage Users</h1>
      </div>
      <div className="lg:w-6/12 mx-auto my-5">
        <div className="w-full space-x-2">
          <form className="space-x-2">
            <input
              className="w-7/12 border-2 b py-3 te px-2 rounded-md  outline-none"
              type="text"
              placeholder="Search For user...."
            />
            <button
              type="submit"
              className="font-medium  bg-[#70e000] text-white py-3 px-4 rounded-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className=" ">
        <div className="overflow-y-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Membership</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            referrerPolicy="no-referrer"
                            src={user?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold ">{user?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user?.email}</td>
                  <td className="uppercase"> {user?.badge}</td>
                  <th>
                    <button
                      onClick={() => handleMakeAdmin(user?._id, user?.name)}
                      className=" bg-green-400  rounded-lg px-4 py-1"
                    >
                      Make Admin
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="flex justify-center my-5">
          <a className="flex items-center px-4 py-2 mx-1 text-gray-900 rounded-md cursor-pointer bg-green-300">
            previous
          </a>
          {pages.map((page, idx) => (
            <button
              onClick={() => handlePaginationButton(page)}
              key={idx}
              className="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:flex dark:bg-gray-800 dark:text-gray-200 hover:bg-green-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
            >
              {page}
            </button>
          ))}

          <a className="flex items-center px-4 py-2 mx-1 text-gray-900 rounded-md cursor-pointer bg-green-300">
            Next
          </a>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
