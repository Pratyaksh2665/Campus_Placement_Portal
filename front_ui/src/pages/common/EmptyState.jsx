const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="bg-white shadow rounded-xl p-10 text-center">
      <h2 className="text-2xl font-bold">{title}</h2>

      <p className="text-gray-500 mt-3">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
