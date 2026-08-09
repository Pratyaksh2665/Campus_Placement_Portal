import { useEffect, useState } from "react";
import api from "../../api/axios";

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/dashboard/recruiter");
        setJobs(response.data.recentJobs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Recent Jobs</h2>

      {jobs.map((job) => (
        <div key={job._id} className="border-b py-3">
          <h3 className="font-semibold">{job.title}</h3>

          <p className="text-gray-500">{job.company?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default RecruiterJobs;
