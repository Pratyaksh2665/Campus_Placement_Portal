import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
  });

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const response = await api.get(`/company/${id}`);

      setFormData({
        name: response.data.company.name,
        description: response.data.company.description,
        website: response.data.company.website,
        location: response.data.company.location,
      });
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
      await api.put(`/company/${id}`, formData);

      toast.success("Company added Successfully");

      navigate("/recruiter/companies");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update company");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Edit Company</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-xl shadow"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 h-36"
        />

        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Update Company
        </button>
      </form>
    </div>
  );
};

export default EditCompany;
