import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppDataProvider } from "@/contexts/AppDataContext";

// Pages
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import RegisterType from "./pages/RegisterType";
import RegisterUFPE from "./pages/RegisterUFPE";
import RegisterExternal from "./pages/RegisterExternal";
import Home from "./pages/Home";
import Chamados from "./pages/Chamados";
import ChamadoForm from "./pages/ChamadoForm";
import Emergency from "./pages/Emergency";
import Relatos from "./pages/Relatos";
import NewRelato from "./pages/NewRelato";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import MyCalls from "./pages/MyCalls";
import MyReports from "./pages/MyReports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppDataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register-type" element={<RegisterType />} />
              <Route path="/register/ufpe" element={<RegisterUFPE />} />
              <Route path="/register/external" element={<RegisterExternal />} />
              <Route path="/home" element={<Home />} />
              <Route path="/chamados" element={<Chamados />} />
              <Route path="/chamados/form/:category" element={<ChamadoForm />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/relatos/:locationId" element={<Relatos />} />
              <Route path="/relatos/:locationId/new" element={<NewRelato />} />
              <Route path="/relatos/:locationId/edit/:relatoId" element={<NewRelato />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/my-calls" element={<MyCalls />} />
              <Route path="/my-reports" element={<MyReports />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppDataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
