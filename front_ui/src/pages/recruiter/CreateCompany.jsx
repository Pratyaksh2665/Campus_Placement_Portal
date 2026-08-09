import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

const CreateCompany = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/company/create", formData);

      toast.success("Success");

      navigate("/recruiter/companies");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create company");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Create Company</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-xl shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="description"
          placeholder="Company Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 h-36"
        />

        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Create Company
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;
