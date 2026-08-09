import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../pages/common/Loader";

const RecruiterStats = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard/recruiter");
        setDashboard(response.data.dashboard);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return <Loader />;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-500">Companies</h3>

        <p className="text-4xl font-bold mt-3">{dashboard.totalCompanies}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-500">Jobs Posted</h3>

        <p className="text-4xl font-bold mt-3">{dashboard.totalJobs}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-500">Applications</h3>

        <p className="text-4xl font-bold mt-3">{dashboard.totalApplications}</p>
      </div>
    </div>
  );
};

export default RecruiterStats;
