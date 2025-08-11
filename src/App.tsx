
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlantFarming from "./pages/PlantFarming";
import AnimalFarming from "./pages/AnimalFarming";
import EmailVerification from "./pages/EmailVerification";
import PhoneVerification from "./pages/PhoneVerification";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordResetOTP from "./pages/PasswordResetOTP";
import PasswordReset from "./pages/PasswordReset";
import PasswordResetEmailSent from "./pages/PasswordResetEmailSent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/verify-phone" element={<PhoneVerification />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-reset-otp" element={<PasswordResetOTP />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/password-reset-email-sent" element={<PasswordResetEmailSent />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/plant-farming" element={
              <ProtectedRoute>
                <PlantFarming />
              </ProtectedRoute>
            } />
            <Route path="/animal-farming" element={
              <ProtectedRoute>
                <AnimalFarming />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
