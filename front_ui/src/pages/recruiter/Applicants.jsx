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
  }, []);

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
        <div className="space-y-5">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {application.student.name}
                </h2>

                <p className="text-gray-600">{application.student.email}</p>

                <p className="mt-2">
                  Status:
                  <span className="font-semibold ml-2">
                    {application.status}
                  </span>
                </p>

                {application.student.resume && (
                  <a
                    href={application.student.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    View Resume
                  </a>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(application._id, "accepted")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(application._id, "rejected")}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
