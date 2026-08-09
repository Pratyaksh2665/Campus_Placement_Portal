import { useEffect, useState } from "react";
import api from "../../api/axios";

const RecentApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/applications/my");

        setApplications(response.data.applications);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Recent Applications</h2>

      {applications.length === 0 ? (
        <p>No Applications Yet</p>
      ) : (
        applications.map((application) => (
          <div key={application._id} className="border-b py-3">
            <h3 className="font-semibold">{application.job.title}</h3>

            <p className="text-gray-500">{application.job.company?.name}</p>

            <span className="text-blue-600">{application.status}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentApplications;
