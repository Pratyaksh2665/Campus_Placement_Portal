import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../pages/common/Loader";
import EmptyState from "../../pages/common/EmptyState";

const DashboardStats = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard/student");
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
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-gray-500">Applied Jobs</h3>

        <p className="text-4xl font-bold mt-3">{dashboard.totalApplications}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-gray-500">Saved Jobs</h3>

        <p className="text-4xl font-bold mt-3">{dashboard.totalSavedJobs}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-gray-500">Selected</h3>

        <p className="text-4xl font-bold mt-3">{dashboard.stats.Selected}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
