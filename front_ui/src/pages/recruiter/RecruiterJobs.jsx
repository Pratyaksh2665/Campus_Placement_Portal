import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs/recruiter");
      setJobs(response.data.jobs);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to fetch jobs");
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
      alert("Job deleted successfully");
      fetchJobs();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete job");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-2xl font-semibold">Loading Jobs...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Jobs</h1>

        <Link
          to="/recruiter/job/create"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          + Create Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center text-xl text-gray-500 py-20">
          No Jobs Posted Yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow rounded-xl p-6">
              <h2 className="text-2xl font-bold">{job.title}</h2>

              <p className="mt-2 text-gray-600">{job.company?.name}</p>

              <p className="mt-2 text-gray-500">{job.location}</p>

              <div className="flex gap-4 mt-6">
                <Link
                  to={`/recruiter/job/${job._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteJob(job._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>

                <Link
                  to={`/recruiter/job/${job._id}/applicants`}
                  className="text-green-600 hover:underline"
                >
                  Applicants
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecruiterJobs;
