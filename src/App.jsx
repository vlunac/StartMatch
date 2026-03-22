// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import LandingPage         from "./pages/LandingPage";
import LoginPage           from "./pages/LoginPage";
import RegisterPage        from "./pages/RegisterPage";
import InvestorDashboard   from "./pages/InvestorDashboard";
import FounderDashboard    from "./pages/FounderDashboard";
import SearchPage          from "./pages/SearchPage";
import NetworkPage         from "./pages/NetworkPage";
import InvestorProfilePage from "./pages/InvestorProfilePage";
import FounderProfilePage  from "./pages/FounderProfilePage";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function DashboardRouter() {
  const { role } = useAuth();
  return role === "investor" ? <InvestorDashboard /> : <FounderDashboard />;
}

function AuthLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">{children}</main>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><AuthLayout><DashboardRouter /></AuthLayout></ProtectedRoute>} />
      <Route path="/search"    element={<ProtectedRoute><AuthLayout><SearchPage /></AuthLayout></ProtectedRoute>} />
      <Route path="/network"   element={<ProtectedRoute><AuthLayout><NetworkPage /></AuthLayout></ProtectedRoute>} />
      <Route path="/portfolio" element={<ProtectedRoute><AuthLayout><InvestorProfilePage /></AuthLayout></ProtectedRoute>} />
      <Route path="/profile"   element={<ProtectedRoute><AuthLayout><FounderProfilePage /></AuthLayout></ProtectedRoute>} />
      <Route path="/investors/:id" element={<ProtectedRoute><AuthLayout><InvestorProfilePage /></AuthLayout></ProtectedRoute>} />
      <Route path="/founders/:id"  element={<ProtectedRoute><AuthLayout><FounderProfilePage /></AuthLayout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
