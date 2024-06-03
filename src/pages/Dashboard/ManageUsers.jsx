import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [],isLoading } = useQuery({
    queryKey: ["AllUsers"],
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });

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
  if(isLoading){
    <p>Loading.......</p>
  }
  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-semibold py-9">Manage Users</h1>
      </div>
      <div className="flex justify-center">
        <div className="overflow-x-auto">
          <table className="table">
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
    </div>
  );
};

export default ManageUsers;
