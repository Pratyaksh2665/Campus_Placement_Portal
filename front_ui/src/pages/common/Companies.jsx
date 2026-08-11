import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/companies");

        setCompanies(response.data.companies || []);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-10 text-4xl font-bold">Companies</h1>

      {companies.length === 0 ? (
        <EmptyState
          title="No Companies Found"
          subtitle="No companies are currently available."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company._id}
              className="rounded-xl bg-white p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold">{company.name}</h2>

              <p className="mt-2 text-gray-600">{company.location}</p>

              <p className="mt-3 line-clamp-3 text-gray-500">
                {company.description}
              </p>

              <Link
                to={`/companies/${company._id}`}
                className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Companies;
