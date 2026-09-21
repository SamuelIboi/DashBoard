import ProjectAnalytics from "./ProjectAnalytics";
import Reminders from "./Reminders";
import ProjectList from "./ProjectList";
import TeamCollaboration from "./TeamCollaboration";
import ProjectProgress from "./ProjectProgress";
import TimeTracker from "./TimeTracker";

const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-12 m-5 grid-rows-2 gap-4">
      {/* Project Analytics — row 1, cols 1-5 */}
      <div className="col-span-5 row-span-1">
        <ProjectAnalytics />
      </div>

      {/* Reminders — row 1, cols 6-9 */}
      <div className="col-span-4 row-span-1">
        <Reminders />
      </div>

      {/* Project List — cols 10-12, spans BOTH rows */}
      <div className="col-span-3 row-span-2 flex flex-col gap-4">
        <ProjectList />
        <TimeTracker />
      </div>

      {/* Team Collaboration — row 2, cols 1-5 */}
      <div className="col-span-5 row-span-1">
        <TeamCollaboration />
      </div>

      {/* Project Progress — row 2, cols 6-9 */}
      <div className="col-span-4 row-span-1">
        <ProjectProgress />
      </div>
    </div>
  );
};

export default DashboardGrid;
