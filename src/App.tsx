import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Chat from "@/pages/Chat";
import Calls from "@/pages/Calls";
import Workflows from "@/pages/Workflows";
import Shopping from "@/pages/Shopping";
import Health from "@/pages/Health";
import WebsiteBuilder from "@/pages/WebsiteBuilder";
import Settings from "@/pages/Settings";
import Integrations from "@/pages/Integrations";
import Help from "@/pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}> 
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/calls" element={<Calls />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/shopping" element={<Shopping />} />
              <Route path="/health" element={<Health />} />
              <Route path="/builder" element={<WebsiteBuilder />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
