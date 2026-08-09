import { useEffect, useState } from "react";

import api from "../../api/axios";
import JobCard from "./JobCard";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");

        setJobs(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Latest Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestJobs;
