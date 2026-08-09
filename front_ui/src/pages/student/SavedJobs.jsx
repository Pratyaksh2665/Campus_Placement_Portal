import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import toast from "react-hot-toast";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/saved-jobs");

      setSavedJobs(response.data.savedJobs);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to fetch saved jobs",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const removeSavedJob = async (jobId) => {
    const confirmRemove = window.confirm("Remove this job from saved jobs?");

    if (!confirmRemove) return;

    try {
      await api.delete(`/saved-jobs/${jobId}`);

      setSavedJobs((prev) => prev.filter((item) => item.job._id !== jobId));

      toast.success("Job removed successfully");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to remove saved job",
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <EmptyState
          title="No Saved Jobs"
          subtitle="Save jobs to view them here."
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold">{item.job.title}</h2>

              <p className="mt-2 text-gray-600">{item.job.company?.name}</p>

              <p className="mt-2 text-gray-500">{item.job.location}</p>

              <div className="flex gap-5 mt-6">
                <Link
                  to={`/jobs/${item.job._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>

                <button
                  onClick={() => removeSavedJob(item.job._id)}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
