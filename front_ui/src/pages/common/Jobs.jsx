import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../../api/axios";
import JobCard from "../../components/home/job/JobCard";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

const Jobs = () => {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(() => {
    return searchParams.get("keyword") || "";
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (keyword) => {
    try {
      setLoading(true);

      const response = await api.get("/jobs", {
        params: {
          keyword: keyword.trim(),
        },
      });

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">All Jobs</h1>

      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Jobs */}
      {jobs.length === 0 ? (
        <EmptyState
          title="No Jobs Found"
          subtitle="Try changing your search or check back later."
        />
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
