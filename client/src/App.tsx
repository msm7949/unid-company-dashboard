import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import TeamBoard from "./pages/TeamBoard";
import Collaboration from "./pages/Collaboration";
import OrgChart from "./pages/OrgChart";
import KPI from "./pages/KPI";
import Timeline from "./pages/Timeline";
import CommLog from "./pages/CommLog";
import StockDashboard from "./pages/StockDashboard";

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/teams" component={TeamBoard} />
        <Route path="/collaboration" component={Collaboration} />
        <Route path="/org-chart" component={OrgChart} />
        <Route path="/kpi" component={KPI} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/comm-log" component={CommLog} />
        <Route path="/stock" component={StockDashboard} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
