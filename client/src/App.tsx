import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AccountsPage from "./pages/AccountsPage";
import AccountDetailPage from "./pages/AccountDetailPage";
import KontaktePage from "./pages/KontaktePage";
import KontaktDetailPage from "./pages/KontaktDetailPage";
import LeadsPage from "./pages/LeadsPage";
import LeadDetailPage from "./pages/LeadDetailPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import OpportunityDetailPage from "./pages/OpportunityDetailPage";
import UnterkuenftePage from "./pages/UnterkuenftePage";
import UnterkunftDetailPage from "./pages/UnterkunftDetailPage";
import BuchungenPage from "./pages/BuchungenPage";
import BuchungDetailPage from "./pages/BuchungDetailPage";
import AngebotePage from "./pages/AngebotePage";
import AngebotDetailPage from "./pages/AngebotDetailPage";
import StundenerfassungPage from "./pages/StundenerfassungPage";
import CasesPage from "./pages/CasesPage";
import CaseDetailPage from "./pages/CaseDetailPage";
import TasksPage from "./pages/TasksPage";
import TaskDetailPage from "./pages/TaskDetailPage";

export default function App() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is logged in
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => {
        if (r.ok) return r.json();
        throw new Error("Not authenticated");
      })
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("user");
        setAuthenticated(false);
      });
  }, []);

  const handleLogin = () => setAuthenticated(true);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    localStorage.removeItem("user");
    setAuthenticated(false);
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-lg">Laden...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 bg-gray-50 overflow-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/accounts/:id" element={<AccountDetailPage />} />
          <Route path="/kontakte" element={<KontaktePage />} />
          <Route path="/kontakte/:id" element={<KontaktDetailPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/leads/:id" element={<LeadDetailPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
          <Route path="/unterkuenfte" element={<UnterkuenftePage />} />
          <Route path="/unterkuenfte/:id" element={<UnterkunftDetailPage />} />
          <Route path="/buchungen" element={<BuchungenPage />} />
          <Route path="/buchungen/:id" element={<BuchungDetailPage />} />
          <Route path="/angebote" element={<AngebotePage />} />
          <Route path="/angebote/:id" element={<AngebotDetailPage />} />
          <Route path="/stundenerfassung" element={<StundenerfassungPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/:id" element={<CaseDetailPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
