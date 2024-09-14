import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: users = [] } = useQuery({
    queryKey: ["AllUsers", currentPage, itemsPerPage, search],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/users?page=${currentPage}&size=${itemsPerPage}&search=${search}`
      );
      return data;
    },
  });
  const { data: UserCount = {} } = useQuery({
    queryKey: ["counts", search],
    queryFn: async () => {
      const { data } = await axiosSecure(`/usersCount?search=${search}`);
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
  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
  };
  console.log(search);
  return (
    <div>
      <Helmet>
        <title>ChatSphere || Manage Users </title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-semibold py-9">Manage Users</h1>
      </div>
      <div className="lg:w-6/12 mx-auto my-5">
        <div className="w-full space-x-1">
          <form onSubmit={handleSearch} className="space-x-2">
            <input
              className="w-7/12  border-2 mx-7 lg:mx-0 py-3  px-2 rounded-md  outline-none"
              type="text"
              name="search"
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
      <div className="">
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
                      className=" bg-[#70e000] text-white font-medium rounded-lg px-4 py-1"
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
          <button
            disabled={currentPage == 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className="flex items-center px-4 py-2 mx-1 text-gray-900 rounded-md cursor-pointer bg-green-300"
          >
            previous
          </button>
          {pages.map((page, idx) => (
            <button
              onClick={() => handlePaginationButton(page)}
              key={idx}
              className={`items-center   px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-green-100 rounded-md sm:flex  hover:bg-green-600  hover:text-white `}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage == 2}
            onClick={() => handlePaginationButton(currentPage + 1)}
            className="flex items-center px-4 py-2 mx-1 text-gray-900 rounded-md cursor-pointer bg-green-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
