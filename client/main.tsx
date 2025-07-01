import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewAds from "./pages/ViewAds";
import Referrals from "./pages/Referrals";
import Withdraw from "./pages/Withdraw";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Placeholder component for upcoming pages
const ComingSoon = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">This page is coming soon!</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ads" element={<ViewAds />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/faq" element={<ComingSoon title="FAQ" />} />
          <Route path="/help" element={<ComingSoon title="Help Center" />} />
          <Route path="/contact" element={<ComingSoon title="Contact Us" />} />
          <Route
            path="/terms"
            element={<ComingSoon title="Terms of Service" />}
          />
          <Route
            path="/privacy"
            element={<ComingSoon title="Privacy Policy" />}
          />
          <Route path="/demo" element={<ComingSoon title="Demo" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
