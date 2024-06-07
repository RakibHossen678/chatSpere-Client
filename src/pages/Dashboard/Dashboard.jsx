import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className="w-screen lg:flex">
      <div className="lg:min-w-[20%]">
        <Sidebar></Sidebar>
      </div>
      <div className="lg:mx-10 lg:w-[75%]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
