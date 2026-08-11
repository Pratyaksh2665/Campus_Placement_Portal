import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          JobPortal
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-8">
          {/* Home */}
          <li>
            <Link to="/" className="font-medium hover:text-blue-600">
              Home
            </Link>
          </li>

          {/* Everyone can browse jobs */}
          <li>
            <Link to="/jobs" className="font-medium hover:text-blue-600">
              Jobs
            </Link>
          </li>

          {/* Everyone can browse companies */}
          <li>
            <Link to="/companies" className="font-medium hover:text-blue-600">
              Companies
            </Link>
          </li>

          {/* Student */}
          {user?.role === "student" && (
            <>
              <li>
                <Link
                  to="/saved-jobs"
                  className="font-medium hover:text-blue-600"
                >
                  Saved Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/student/applications"
                  className="font-medium hover:text-blue-600"
                >
                  My Applications
                </Link>
              </li>

              <li>
                <Link
                  to="/student/dashboard"
                  className="font-medium hover:text-blue-600"
                >
                  Dashboard
                </Link>
              </li>
            </>
          )}

          {/* Recruiter */}
          {user?.role === "recruiter" && (
            <>
              <li>
                <Link
                  to="/recruiter/companies"
                  className="font-medium hover:text-blue-600"
                >
                  My Companies
                </Link>
              </li>

              <li>
                <Link
                  to="/recruiter/jobs"
                  className="font-medium hover:text-blue-600"
                >
                  My Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/recruiter/dashboard"
                  className="font-medium hover:text-blue-600"
                >
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <button
                  type="button"
                  className="cursor-pointer rounded-lg border border-blue-600 px-5 py-2 text-blue-600 hover:bg-blue-50"
                >
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button
                  type="button"
                  className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to={
                  user.role === "student"
                    ? "/student/profile"
                    : "/recruiter/dashboard"
                }
                className="font-semibold text-gray-700 hover:text-blue-600"
              >
                {user.name}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="cursor-pointer rounded-lg bg-red-500 px-5 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
