import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/company");

      setCompanies(response.data.companies);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Companies</h1>

        <Link
          to="/recruiter/company/create"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          + Add Company
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company._id} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-2xl font-bold">{company.name}</h2>

            <p className="mt-3 text-gray-500">{company.location}</p>

            <Link
              to={`/recruiter/company/${company._id}`}
              className="inline-block mt-5 text-blue-600"
            >
              Edit Company →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
