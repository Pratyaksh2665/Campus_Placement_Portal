import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      navigate("/jobs");
      return;
    }

    navigate(`/jobs?keyword=${encodeURIComponent(value)}`);
  };

  const searchCompany = (company) => {
    navigate(`/jobs?keyword=${encodeURIComponent(company)}`);
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-5xl font-bold">Find Your Dream Job</h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Connect with top companies, explore thousands of opportunities, and
          take the next step in your career.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs by title, company, or skill..."
            className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500 sm:w-[450px]"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Popular Searches */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => searchCompany("Google")}
            className="rounded-full bg-white px-4 py-2 text-sm shadow hover:bg-gray-100"
          >
            Google
          </button>

          <button
            type="button"
            onClick={() => searchCompany("Microsoft")}
            className="rounded-full bg-white px-4 py-2 text-sm shadow hover:bg-gray-100"
          >
            Microsoft
          </button>

          <button
            type="button"
            onClick={() => searchCompany("Amazon")}
            className="rounded-full bg-white px-4 py-2 text-sm shadow hover:bg-gray-100"
          >
            Amazon
          </button>

          <button
            type="button"
            onClick={() => searchCompany("Adobe")}
            className="rounded-full bg-white px-4 py-2 text-sm shadow hover:bg-gray-100"
          >
            Adobe
          </button>

          <button
            type="button"
            onClick={() => searchCompany("Flipkart")}
            className="rounded-full bg-white px-4 py-2 text-sm shadow hover:bg-gray-100"
          >
            Flipkart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
