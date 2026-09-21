import DashBoard from "../components/DashBoard";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-row w-[100%] h-100vh gap-3">
      <Sidebar />
      <DashBoard />
    </div>
  );
};

export default Layout;
