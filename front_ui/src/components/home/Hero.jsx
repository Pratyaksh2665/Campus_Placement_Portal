const Hero = () => {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Find Your <span className="text-blue-600">Dream Job</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with top companies, explore thousands of opportunities, and
          take the next step in your career.
        </p>

        {/* Search Form */}
        <form className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="text"
            placeholder="Search jobs by title, company, or skill..."
            className="w-full sm:w-[450px] px-5 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* Popular Searches */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-white rounded-full shadow text-sm">
            Google
          </span>

          <span className="px-4 py-2 bg-white rounded-full shadow text-sm">
            Microsoft
          </span>

          <span className="px-4 py-2 bg-white rounded-full shadow text-sm">
            Amazon
          </span>

          <span className="px-4 py-2 bg-white rounded-full shadow text-sm">
            Adobe
          </span>

          <span className="px-4 py-2 bg-white rounded-full shadow text-sm">
            Flipkart
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
