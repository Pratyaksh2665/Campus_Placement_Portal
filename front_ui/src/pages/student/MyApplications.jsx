import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import toast from "react-hot-toast";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/applications/my");

      setApplications(response.data.applications);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to fetch applications",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">My Applications</h1>

      {applications.length === 0 ? (
        <EmptyState
          title="No Applications Yet"
          subtitle="Apply for jobs to track your applications here."
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-bold">{application.job.title}</h2>

              <p className="mt-2 text-gray-600">
                {application.job.company?.name}
              </p>

              <p className="mt-2 text-gray-500">{application.job.location}</p>

              <p className="mt-3 text-gray-500">
                Applied On:{" "}
                {new Date(application.createdAt).toLocaleDateString()}
              </p>

              <span
                className={`inline-block mt-5 px-4 py-2 rounded-full text-white font-medium ${
                  application.status === "accepted"
                    ? "bg-green-600"
                    : application.status === "rejected"
                      ? "bg-red-600"
                      : application.status === "interview"
                        ? "bg-purple-600"
                        : application.status === "under review"
                          ? "bg-blue-600"
                          : "bg-yellow-500"
                }`}
              >
                {application.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
