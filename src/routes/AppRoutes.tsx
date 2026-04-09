import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from '@/layouts/AppShell';
import CarbonCenterPage from '@/pages/CarbonCenterPage';
import CockpitPage from '@/pages/CockpitPage';
import ControlCenterPage from '@/pages/ControlCenterPage';
import CostWorkbenchPage from '@/pages/CostWorkbenchPage';
import DeepRegulationPage from '@/pages/DeepRegulationPage';
import LoadWorkbenchPage from '@/pages/LoadWorkbenchPage';
import MarketDecisionPage from '@/pages/MarketDecisionPage';
import LoginPage from '@/pages/LoginPage';
import RevenueOverviewPage from '@/pages/RevenueOverviewPage';
import SandboxPage from '@/pages/SandboxPage';
import StrategyCenterPage from '@/pages/StrategyCenterPage';
import { PublicOnlyRoute, RequireAuth } from '@/routes/RouteGuards';
import { useAuthStore } from '@/store/useAuthStore';

export default function AppRoutes() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<ControlCenterPage />} />
          <Route path="/revenue" element={<RevenueOverviewPage />} />
          <Route path="/cost" element={<CostWorkbenchPage />} />
          <Route path="/load" element={<LoadWorkbenchPage />} />
          <Route path="/market" element={<MarketDecisionPage />} />
          <Route path="/deep-regulation" element={<DeepRegulationPage />} />
          <Route path="/carbon" element={<CarbonCenterPage />} />
          <Route path="/sandbox" element={<SandboxPage />} />
          <Route path="/agents" element={<StrategyCenterPage />} />
          <Route path="/cockpit" element={<CockpitPage />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />}
      />
    </Routes>
  );
}
