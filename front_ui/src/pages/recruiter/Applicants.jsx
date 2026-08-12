import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api/axios";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import toast from "react-hot-toast";

const Applicants = () => {
  const { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // AI states
  const [aiLoading, setAiLoading] = useState({});
  const [aiResults, setAiResults] = useState({});

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/applications/job/${id}`);

      setApplications(response.data.applications || []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to fetch applicants",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  // ==========================================
  // AI APPLICANT MATCH
  // ==========================================
  const checkAIMatch = async (application) => {
    const applicationId = application._id;
    const studentId = application.student?._id;

    if (!studentId) {
      toast.error("Applicant information not found");
      return;
    }

    try {
      setAiLoading((prev) => ({
        ...prev,
        [applicationId]: true,
      }));

      const response = await api.post(
        `/ai/job-match/${id}/applicant/${studentId}`,
      );

      setAiResults((prev) => ({
        ...prev,
        [applicationId]: response.data.analysis,
      }));

      toast.success("AI analysis completed");
    } catch (error) {
      console.error("AI applicant match error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to generate AI applicant match",
      );
    } finally {
      setAiLoading((prev) => ({
        ...prev,
        [applicationId]: false,
      }));
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      await api.put(`/applications/${applicationId}/status`, {
        status,
      });

      setApplications((prev) =>
        prev.map((application) =>
          application._id === applicationId
            ? { ...application, status }
            : application,
        ),
      );

      toast.success("Application status updated");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to update application",
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-10">Applicants</h1>

      {applications.length === 0 ? (
        <EmptyState
          title="No Applicants Yet"
          subtitle="Applications will appear here once students apply."
        />
      ) : (
        <div className="space-y-6">
          {applications.map((application) => {
            const aiResult = aiResults[application._id];
            const isAiLoading = aiLoading[application._id];

            return (
              <div
                key={application._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                {/* Applicant information */}
                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                  <div>
                    <h2 className="text-xl font-bold">
                      {application.student?.name || "Unknown Student"}
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {application.student?.email}
                    </p>

                    <p className="mt-3">
                      Status:
                      <span className="font-semibold ml-2">
                        {application.status}
                      </span>
                    </p>

                    {/* Student profile information */}
                    <div className="mt-4 space-y-1 text-gray-600">
                      {application.student?.college && (
                        <p>
                          <span className="font-medium">College:</span>{" "}
                          {application.student.college}
                        </p>
                      )}

                      {application.student?.branch && (
                        <p>
                          <span className="font-medium">Branch:</span>{" "}
                          {application.student.branch}
                        </p>
                      )}

                      {application.student?.cgpa !== undefined &&
                        application.student?.cgpa !== null && (
                          <p>
                            <span className="font-medium">CGPA:</span>{" "}
                            {application.student.cgpa}
                          </p>
                        )}
                    </div>

                    {/* Resume */}
                    {application.student?.resume && (
                      <a
                        href={application.student.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline mt-3 inline-block"
                      >
                        View Resume
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 items-start">
                    <button
                      onClick={() => checkAIMatch(application)}
                      disabled={isAiLoading}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                    >
                      {isAiLoading ? "Analyzing..." : "✨ Check AI Match"}
                    </button>

                    <button
                      onClick={() => updateStatus(application._id, "Selected")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Select
                    </button>

                    <button
                      onClick={() => updateStatus(application._id, "Rejected")}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                {/* AI Result */}
                {aiResult && (
                  <div className="mt-6 border-t pt-6">
                    <div className="bg-gray-50 rounded-xl p-6 border">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h3 className="text-2xl font-bold">
                          ✨ AI Applicant Analysis
                        </h3>

                        <div className="text-3xl font-bold text-purple-600">
                          {aiResult.matchScore}%
                        </div>
                      </div>

                      {/* Matched Skills */}
                      {aiResult.matchedSkills?.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-lg">
                            Matched Skills
                          </h4>

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
                            Missing Skills
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

                      {/* Experience and Education */}
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
                            Improvements
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
                          <p className="font-semibold">AI Recommendation</p>

                          <p className="text-gray-700 mt-1">
                            {aiResult.recommendation}
                          </p>
                        </div>
                      )}

                      <p className="text-xs text-gray-500 mt-6">
                        AI analysis is an informational aid. The final hiring
                        decision should be made by the recruiter.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Applicants;
