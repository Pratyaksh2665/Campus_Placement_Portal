import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs/recruiter");
      setJobs(response.data.jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">My Jobs</h1>

        <Link
          to="/recruiter/job/create"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Create Job
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold">{job.title}</h2>

            <p className="text-gray-600 mt-2">{job.company?.name}</p>

            <p className="mt-2">{job.location}</p>

            <div className="flex gap-5 mt-6">
              <Link to={`/recruiter/job/${job._id}`} className="text-blue-600">
                Edit
              </Link>

              <button
                onClick={() => deleteJob(job._id)}
                className="text-red-600"
              >
                Delete
              </button>

              <Link
                to={`/recruiter/job/${job._id}/applicants`}
                className="text-green-600"
              >
                Applicants
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
