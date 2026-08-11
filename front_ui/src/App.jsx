import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Common Pages
import Home from "./pages/common/Home";
import Jobs from "./pages/common/Jobs";
import JobDetails from "./pages/common/JobDetails";
import Companies from "./pages/common/Companies";
import CompanyDetails from "./pages/common/CompanyDetails";
import NotFound from "./pages/common/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import MyApplications from "./pages/student/MyApplications";
import SavedJobs from "./pages/student/SavedJobs";
import StudentProfile from "./pages/student/StudentProfile";

// Recruiter Pages
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterCompanies from "./pages/recruiter/Companies";
import CreateCompany from "./pages/recruiter/CreateCompany";
import EditCompany from "./pages/recruiter/EditCompany";
import RecruiterJobs from "./pages/recruiter/Jobs";
import CreateJob from "./pages/recruiter/CreateJob";
import EditJob from "./pages/recruiter/EditJob";
import Applicants from "./pages/recruiter/Applicants";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/jobs" element={<Jobs />} />

          <Route path="/jobs/:id" element={<JobDetails />} />

          {/* Public Companies */}
          <Route path="/companies" element={<Companies />} />

          {/* Public Company Details */}
          <Route path="/companies/:id" element={<CompanyDetails />} />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/applications"
            element={
              <ProtectedRoute role="student">
                <MyApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/profile"
            element={
              <ProtectedRoute role="student">
                <StudentProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute role="student">
                <SavedJobs />
              </ProtectedRoute>
            }
          />

          {/* ================= RECRUITER ================= */}

          <Route
            path="/recruiter/dashboard"
            element={
              <ProtectedRoute role="recruiter">
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />

          {/* Recruiter's Companies */}
          <Route
            path="/recruiter/companies"
            element={
              <ProtectedRoute role="recruiter">
                <RecruiterCompanies />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/company/create"
            element={
              <ProtectedRoute role="recruiter">
                <CreateCompany />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/company/:id"
            element={
              <ProtectedRoute role="recruiter">
                <EditCompany />
              </ProtectedRoute>
            }
          />

          {/* Recruiter's Jobs */}
          <Route
            path="/recruiter/jobs"
            element={
              <ProtectedRoute role="recruiter">
                <RecruiterJobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/job/create"
            element={
              <ProtectedRoute role="recruiter">
                <CreateJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/job/:id"
            element={
              <ProtectedRoute role="recruiter">
                <EditJob />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruiter/job/:id/applicants"
            element={
              <ProtectedRoute role="recruiter">
                <Applicants />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
