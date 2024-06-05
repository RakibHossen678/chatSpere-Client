import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="w-screen lg:flex">
      <div className="min-w-[20%]">
        <Sidebar></Sidebar>
      </div>
      <div className="mx-10 w-[75%]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
