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
  const [expandedId, setExpandedId] = useState(null);

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/applications/job/${id}`);

      setApplications(response.data.applications);
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
            const student = application.student;

            const isExpanded = expandedId === application._id;

            return (
              <div
                key={application._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                {/* Basic Information */}
                <div className="flex justify-between items-start gap-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {student?.name || "Unknown Student"}
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {student?.email || "No email"}
                    </p>

                    <p className="mt-2">
                      Status:
                      <span className="font-semibold ml-2">
                        {application.status}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {/* View Details */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : application._id)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
                      {isExpanded ? "Hide Details" : "View Details"}
                    </button>

                    {/* Accept */}
                    <button
                      type="button"
                      onClick={() => updateStatus(application._id, "Selected")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Accept
                    </button>

                    {/* Reject */}
                    <button
                      type="button"
                      onClick={() => updateStatus(application._id, "Rejected")}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                {/* Applicant Details */}
                {isExpanded && (
                  <div className="mt-6 border-t pt-6">
                    <h3 className="text-2xl font-bold mb-5">
                      Applicant Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-5">
                      {/* Phone */}
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-semibold">
                          {student?.phone || "Not provided"}
                        </p>
                      </div>

                      {/* College */}
                      <div>
                        <p className="text-sm text-gray-500">College</p>
                        <p className="font-semibold">
                          {student?.college || "Not provided"}
                        </p>
                      </div>

                      {/* Branch */}
                      <div>
                        <p className="text-sm text-gray-500">Branch</p>
                        <p className="font-semibold">
                          {student?.branch || "Not provided"}
                        </p>
                      </div>

                      {/* Year */}
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-semibold">
                          {student?.year || "Not provided"}
                        </p>
                      </div>

                      {/* CGPA */}
                      <div>
                        <p className="text-sm text-gray-500">CGPA</p>
                        <p className="font-semibold">
                          {student?.cgpa ?? "Not provided"}
                        </p>
                      </div>

                      {/* Experience */}
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="font-semibold">
                          {student?.experience ?? 0} years
                        </p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 mb-2">Skills</p>

                      {student?.skills?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {student.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No skills provided</p>
                      )}
                    </div>

                    {/* Bio */}
                    {student?.bio && (
                      <div className="mt-6">
                        <p className="text-sm text-gray-500 mb-2">About</p>

                        <p className="text-gray-700 leading-7">{student.bio}</p>
                      </div>
                    )}

                    {/* Links */}
                    <div className="mt-6 flex flex-wrap gap-5">
                      {student?.github && (
                        <a
                          href={student.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          GitHub
                        </a>
                      )}

                      {student?.linkedin && (
                        <a
                          href={student.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          LinkedIn
                        </a>
                      )}

                      {student?.portfolio && (
                        <a
                          href={student.portfolio}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Portfolio
                        </a>
                      )}

                      {student?.resume && (
                        <a
                          href={student.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline font-semibold"
                        >
                          View Resume
                        </a>
                      )}
                    </div>

                    {/* Status Controls */}
                    <div className="mt-8 border-t pt-5">
                      <p className="text-sm text-gray-500 mb-2">
                        Update Application Status
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(application._id, "Under Review")
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Under Review
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(application._id, "Interview")
                          }
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Interview
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(application._id, "Selected")
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Selected
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(application._id, "Rejected")
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Rejected
                        </button>
                      </div>
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
