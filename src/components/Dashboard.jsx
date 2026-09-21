import DashboardGrid from "./DashboardGrid";
import DashboardHeader from "./Dashboardheader";
import Topbar from "./Topbar";

const DashBoard = () => {
  return (
    <div className="flex flex-col gap-2 mt-2 w-4/5 h-[200vh] bg-white rounded-2xl">
      <Topbar />
      <DashboardHeader />
      <DashboardGrid />
    </div>
  );
};

export default DashBoard;
