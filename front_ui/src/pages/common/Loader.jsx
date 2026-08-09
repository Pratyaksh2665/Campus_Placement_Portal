import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <Oval
        height={60}
        width={60}
        color="#2563eb"
        secondaryColor="#93c5fd"
        strokeWidth={4}
      />
    </div>
  );
};

export default Loader;
