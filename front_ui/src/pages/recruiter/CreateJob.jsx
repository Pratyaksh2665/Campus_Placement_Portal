import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

const CreateJob = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "Full-Time",
    position: "",
    company: "",
  });

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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/jobs/create", formData);

      toast.success("Job created successfully");

      navigate("/recruiter/jobs");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Create Job</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-8 space-y-5"
      >
        <input
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg h-32"
        />

        <textarea
          name="requirements"
          placeholder="Requirements"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg h-24"
        />

        <input
          name="salary"
          type="number"
          placeholder="Salary"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="experienceLevel"
          type="number"
          placeholder="Experience"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="position"
          type="number"
          placeholder="Open Positions"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <select
          name="jobType"
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
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="">Select Company</option>

          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
