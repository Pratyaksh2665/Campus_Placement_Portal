import { useEffect, useState } from "react";

import api from "../../api/axios";
import CompanyCard from "../company/CompanyCard";

const FeaturedCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/companies");
        console.log(response.data);
        setCompanies(response.data.companies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Featured Companies
      </h2>

      {companies.length === 0 ? (
        <p className="text-center text-gray-500">No companies available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCompanies;
