import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold">{job.title}</h3>

      <p className="text-blue-600 font-medium mt-2">{job.company?.name}</p>

      <p className="text-gray-500 mt-2">{job.location}</p>

      <div className="flex gap-2 mt-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {job.jobType}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          ₹ {job.salary}
        </span>
      </div>

      <Link
        to={`/jobs/${job._id}`}
        className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
