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

  // AI states
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

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

  // AI Job Match
  const handleAIJobMatch = async () => {
    try {
      setAiLoading(true);
      setAiResult(null);

      const response = await api.post(`/ai/job-match/${job._id}`);

      setAiResult(response.data.analysis);
    } catch (error) {
      console.error("AI Job Match Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to generate AI job match. Please try again.",
      );
    } finally {
      setAiLoading(false);
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

        <p className="text-gray-700">
          {Array.isArray(job.requirements)
            ? job.requirements.join(", ")
            : job.requirements}
        </p>

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

        {/* AI Job Match */}
        {user?.role === "student" && (
          <div className="mt-10 border-t pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold"> AI Job Match</h2>

                <p className="text-gray-600 mt-2">
                  See how well your profile matches this job.
                </p>
              </div>

              <button
                onClick={handleAIJobMatch}
                disabled={aiLoading}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
              >
                {aiLoading ? "Analyzing..." : "Check AI Match"}
              </button>
            </div>

            {/* AI Result */}
            {aiResult && (
              <div className="mt-8 bg-gray-50 rounded-xl p-6 border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="text-2xl font-bold">AI Match Result</h3>

                  <div className="text-3xl font-bold text-purple-600">
                    {aiResult.matchScore}%
                  </div>
                </div>

                {/* Matched Skills */}
                {aiResult.matchedSkills?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-lg">Matched Skills</h4>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {aiResult.matchedSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Skills */}
                {aiResult.missingSkills?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-lg">
                      Skills You May Need
                    </h4>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {aiResult.missingSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience & Education */}
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-semibold">Experience Match</p>

                    <p
                      className={
                        aiResult.experienceMatch
                          ? "text-green-600 mt-1"
                          : "text-red-600 mt-1"
                      }
                    >
                      {aiResult.experienceMatch ? "✓ Yes" : "✗ No"}
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <p className="font-semibold">Education Match</p>

                    <p
                      className={
                        aiResult.educationMatch
                          ? "text-green-600 mt-1"
                          : "text-red-600 mt-1"
                      }
                    >
                      {aiResult.educationMatch ? "✓ Yes" : "✗ No"}
                    </p>
                  </div>
                </div>

                {/* Strengths */}
                {aiResult.strengths?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-lg">Strengths</h4>

                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                      {aiResult.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Improvements */}
                {aiResult.improvements?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-lg">
                      Suggested Improvements
                    </h4>

                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                      {aiResult.improvements.map((improvement, index) => (
                        <li key={index}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendation */}
                {aiResult.recommendation && (
                  <div className="mt-6 bg-purple-50 rounded-lg p-4">
                    <p className="font-semibold">Recommendation</p>

                    <p className="text-gray-700 mt-1">
                      {aiResult.recommendation}
                    </p>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-6">
                  AI analysis is an informational aid and should not be treated
                  as a hiring decision.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Existing Apply + Save */}
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
