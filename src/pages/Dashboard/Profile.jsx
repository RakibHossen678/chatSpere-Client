import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import AdminProfile from "./AdminProfile";
import MyProfile from "./MyProfile";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: userRole = "" } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data.role;
    },
  });
  console.log(userRole);
  return (
    <div>
      {userRole === "admin" ? (
        <AdminProfile></AdminProfile>
      ) : (
        <MyProfile></MyProfile>
      )}
    </div>
  );
};

export default Profile;
