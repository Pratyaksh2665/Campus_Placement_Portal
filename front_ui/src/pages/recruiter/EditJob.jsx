import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    position: "",
    company: "",
  });

  useEffect(() => {
    fetchJob();
    fetchCompanies();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);

      const job = response.data.job;

      setFormData({
        title: job.title,
        description: job.description,
        requirements: job.requirements,
        salary: job.salary,
        experienceLevel: job.experienceLevel,
        location: job.location,
        jobType: job.jobType,
        position: job.position,
        company: job.company._id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/company");
      setCompanies(response.data.companies);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/jobs/${id}`, formData);

      toast.success("Job updated successfully");

      navigate("/recruiter/jobs");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Edit Job</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8 space-y-5"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg h-32"
        />

        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg h-24"
        />

        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>

        <select
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
