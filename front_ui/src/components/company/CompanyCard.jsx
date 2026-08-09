import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">
      <div className="flex flex-col items-center text-center">
        <img
          src={company.logo || "https://via.placeholder.com/80"}
          alt={company.name}
          className="w-20 h-20 rounded-full object-cover border"
        />

        <h3 className="mt-4 text-xl font-semibold">{company.name}</h3>

        <p className="text-gray-500 mt-2">{company.location}</p>

        <Link
          to={`/companies/${company._id}`}
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
