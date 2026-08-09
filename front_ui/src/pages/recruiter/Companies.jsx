import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import toast from "react-hot-toast";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const response = await api.get("/company");

      setCompanies(response.data.companies);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const deleteCompany = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/company/${id}`);

      toast.success("Company deleted successfully");

      setCompanies((prev) => prev.filter((company) => company._id !== id));
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete company");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">My Companies</h1>

        <Link
          to="/recruiter/company/create"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Company
        </Link>
      </div>

      {companies.length === 0 ? (
        <EmptyState
          title="No Companies Found"
          subtitle="Create your first company to start posting jobs."
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company._id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-bold">{company.name}</h2>

              <p className="text-gray-600 mt-2">{company.location}</p>

              <p className="text-gray-500 mt-3 line-clamp-3">
                {company.description}
              </p>

              <div className="flex gap-5 mt-6">
                <Link
                  to={`/recruiter/company/${company._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteCompany(company._id)}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Companies;
