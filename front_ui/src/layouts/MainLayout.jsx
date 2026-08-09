import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
