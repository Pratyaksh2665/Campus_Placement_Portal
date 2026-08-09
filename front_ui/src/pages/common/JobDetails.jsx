import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data.job);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      setApplying(true);

      const response = await api.post("/applications/apply", {
        jobId: job._id,
      });

      alert(response.data.message);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to apply for this job");
    } finally {
      setApplying(false);
    }
  };

  const handleSaveJob = async () => {
    try {
      setSaving(true);

      const response = await api.post("/saved-jobs", {
        jobId: job._id,
      });

      alert(response.data.message);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to save job");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!job) {
    return (
      <div className="text-center py-20 text-red-500 text-2xl">
        Job not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold">{job.title}</h1>

        <p className="mt-3 text-2xl text-blue-600 font-semibold">
          {job.company?.name}
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            {job.jobType}
          </span>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            ₹ {job.salary}
          </span>

          <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
            {job.location}
          </span>
        </div>

        <hr className="my-8" />

        <h2 className="text-2xl font-semibold mb-3">Job Description</h2>

        <p className="text-gray-700 leading-8">{job.description}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">Requirements</h2>

        <p className="text-gray-700">{job.requirements}</p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="font-semibold">Experience</h3>
            <p>{job.experienceLevel} Years</p>
          </div>

          <div>
            <h3 className="font-semibold">Open Positions</h3>
            <p>{job.position}</p>
          </div>
        </div>

        {user?.role === "student" && (
          <div className="flex gap-4 mt-10">
            <button
              onClick={handleApply}
              disabled={applying}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {applying ? "Applying..." : "Apply Now"}
            </button>

            <button
              onClick={handleSaveJob}
              disabled={saving}
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 disabled:bg-gray-200"
            >
              {saving ? "Saving..." : "Save Job"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
