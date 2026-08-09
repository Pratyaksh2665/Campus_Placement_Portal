import RecruiterStats from "../../components/recruiters/RecruiterStats";
import MyCompanies from "../../components/recruiters/MyCompanies";
import RecruiterJobs from "../../components/recruiters/RecruiterJobs";
import RecentApplicants from "../../components/recruiters/RecentApplicants";

const RecruiterDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">Recruiter Dashboard</h1>

      <RecruiterStats />

      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        <MyCompanies />
        <RecruiterJobs />
      </div>

      <div className="mt-10">
        <RecentApplicants />
      </div>
    </div>
  );
};

export default RecruiterDashboard;
