import DashboardStats from "../../components/dashboard/DashboardStats";
import RecommendedJobs from "../../components/dashboard/RecommendedJobs";
import RecentApplications from "../../components/dashboard/RecentApplications";

const StudentDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">Student Dashboard</h1>

      <DashboardStats />

      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        <RecentApplications />
        <RecommendedJobs />
      </div>
    </div>
  );
};

export default StudentDashboard;
