import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="w-screen">
      <div className="min-w-[20%]">
        <Sidebar></Sidebar>
      </div>
      <div className=" w-[90%]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
