import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../common/Loader";
import toast from "react-hot-toast";

const StudentProfile = () => {
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    college: "",
    branch: "",
    year: "",
    cgpa: "",
    skills: "",
    resume: "",
  });

  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");

      setProfile({
        ...response.data.user,
        skills: response.data.user.skills?.join(", ") || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/profile", {
        ...profile,
        year: profile.year ? Number(profile.year) : undefined,
        cgpa: profile.cgpa ? Number(profile.cgpa) : undefined,
        skills: profile.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      setProfile({
        ...response.data.user,
        skills: response.data.user.skills?.join(", ") || "",
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const uploadResume = async () => {
    if (!resume) {
      toast.error("Please select a resume");
      return;
    }

    const formData = new FormData();

    formData.append("resume", resume);

    try {
      await api.post("/profile/upload-resume", formData);

      toast.success("Resume Uploaded");

      fetchProfile();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Resume upload failed");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      <form
        onSubmit={updateProfile}
        className="bg-white shadow rounded-xl p-8 space-y-5"
      >
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="phone"
          value={profile.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="college"
          value={profile.college || ""}
          onChange={handleChange}
          placeholder="College"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="branch"
          value={profile.branch || ""}
          onChange={handleChange}
          placeholder="Branch"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="year"
          value={profile.year || ""}
          onChange={handleChange}
          placeholder="Year"
          min="1"
          max="5"
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="cgpa"
          value={profile.cgpa || ""}
          onChange={handleChange}
          placeholder="CGPA"
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="skills"
          value={profile.skills}
          onChange={handleChange}
          placeholder="React, Node, MongoDB"
          className="w-full border p-3 rounded-lg h-24"
        />

        {profile.resume && (
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 block"
          >
            View Resume
          </a>
        )}

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <button
          type="button"
          onClick={uploadResume}
          className="bg-green-600 text-white px-5 py-2 rounded-lg"
        >
          Upload Resume
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg ml-4"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
