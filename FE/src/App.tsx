import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Appointments from "./pages/Appointments";
import AppointmentDetails from "./pages/AppointmentDetails";
import Bookings from "./pages/Bookings";
import CongestionControl from "./pages/CongestionControl";
import UserDashboard from "./pages/UserDashboard";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import CheckinProfiles from "./pages/CheckinProfiles";
import PeakHours from "./pages/PeakHours";
const queryClient = new QueryClient();

const App = () => {
  // ✅ Load FastBots chatbot once globally
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.fastbots.ai/embed.js";
    script.defer = true;
    script.setAttribute("data-bot-id", "cmh9htlwt04sgqi1nz0rxzxwk");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route
              path="/appointments/:orgId"
              element={<AppointmentDetails />}
            />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/congestion-control" element={<CongestionControl />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/checkins" element={<CheckinProfiles />}></Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="/peakhours" element={<PeakHours />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
