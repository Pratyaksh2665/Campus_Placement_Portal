import { useEffect, useState } from "react";
import api from "../../api/axios";

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");

        setJobs(response.data.jobs.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Recommended Jobs</h2>

      {jobs.map((job) => (
        <div key={job._id} className="border-b py-3">
          <h3 className="font-semibold">{job.title}</h3>

          <p className="text-gray-500">{job.company?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendedJobs;
