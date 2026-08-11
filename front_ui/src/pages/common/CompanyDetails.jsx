import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../../api/axios";
import Loader from "./Loader";

const CompanyDetails = () => {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await api.get(`/companies/${id}`);

        setCompany(response.data.company);
      } catch (error) {
        console.error("Failed to fetch company:", error);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!company) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">Company Not Found</h1>

        <p className="mt-3 text-gray-500">
          The company you're looking for does not exist.
        </p>

        <Link
          to="/companies"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          Back to Companies
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-4xl font-bold">{company.name}</h1>

        <p className="mt-3 text-gray-600">📍 {company.location}</p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">About the Company</h2>

          <p className="mt-3 leading-7 text-gray-600">{company.description}</p>
        </div>

        {company.website && (
          <div className="mt-6">
            <a
              href={
                company.website.startsWith("http")
                  ? company.website
                  : `https://${company.website}`
              }
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Company Website
            </a>
          </div>
        )}

        <Link
          to="/companies"
          className="mt-8 inline-block rounded-lg border border-blue-600 px-5 py-2 text-blue-600 hover:bg-blue-50"
        >
          Back to Companies
        </Link>
      </div>
    </div>
  );
};

export default CompanyDetails;
