
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PlantFarming from "./pages/PlantFarming";
import AnimalFarming from "./pages/AnimalFarming";
import EmailVerification from "./pages/EmailVerification";
import PhoneVerification from "./pages/PhoneVerification";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/verify-phone" element={<PhoneVerification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plant-farming" element={<PlantFarming />} />
          <Route path="/animal-farming" element={<AnimalFarming />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
