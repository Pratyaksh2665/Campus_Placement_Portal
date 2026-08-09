import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/dashboard/recruiter");
        setCompanies(response.data.recentCompanies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">My Companies</h2>

      {companies.map((company) => (
        <div key={company._id} className="border-b py-3">
          <h3 className="font-semibold">{company.name}</h3>

          <p className="text-gray-500">{company.location}</p>
        </div>
      ))}
    </div>
  );
};

export default MyCompanies;
