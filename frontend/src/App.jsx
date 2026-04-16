import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Public pages */
import Home from "./pages/Home";
import ListingPage from "./pages/ListingPage";
import About from "./pages/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import AIReadiness from "./pages/AIReadiness";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* Dashboard */
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import UserDashboard from "./pages/dashboard/UserDashboard";
import DashboardLeads from "./pages/dashboard/DashboardLeads";
import DashboardAIReadiness from "./pages/dashboard/DashboardAIReadiness";
import DashboardMessages from "./pages/dashboard/DashboardMessages";

/* Admin */
import AdminDashboard from "./pages/admin/AdminDashboard";

/* Auth */
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* 🌍 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<ListingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ai-readiness" element={<AIReadiness />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/listing/:id" element={<ListingDetails />} />

        {/* 📊 USER DASHBOARD ROUTES */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="leads" element={<DashboardLeads />} />
          <Route path="ai-readiness" element={<DashboardAIReadiness />} />
          <Route path="contacts" element={<DashboardMessages />} />
        </Route>

        {/* 👑 ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<DashboardLeads />} />
          <Route path="ai-readiness" element={<DashboardAIReadiness />} />
          <Route path="contacts" element={<DashboardMessages />} />
        </Route>

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;