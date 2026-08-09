import { useEffect, useState } from "react";
import api from "../../api/axios";

const RecentApplicants = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/dashboard/recruiter");
        setApplications(response.data.recentApplications);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Recent Applicants</h2>

      {applications.map((application) => (
        <div key={application._id} className="border-b py-3">
          <h3 className="font-semibold">{application.student.name}</h3>

          <p>{application.job.title}</p>

          <span className="text-blue-600">{application.status}</span>
        </div>
      ))}
    </div>
  );
};

export default RecentApplicants;
