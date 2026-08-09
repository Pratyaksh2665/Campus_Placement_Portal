import { useEffect, useState } from "react";
import api from "../../api/axios";
import JobCard from "../../components/home/job/JobCard";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (keyword = "") => {
    try {
      setLoading(true);

      const response = await api.get(`/jobs?keyword=${keyword}`);

      setJobs(response.data.jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchJobs();
  }, []);

  // Auto Search after 500ms
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
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-10">All Jobs</h1>

      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Jobs */}
      {jobs.length === 0 ? (
        <EmptyState
          title="No Jobs Found"
          subtitle="Try changing your search or check back later."
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
