import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AboutPage from "./pages/AboutPage";
import PartnersPage from "./pages/PartnersPage";
import BecomePartnerPage from "./pages/BecomePartnerPage";
import StrategyReturnPage from "./pages/StrategyReturnPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cursos" element={<CoursesPage />} />
          <Route path="/cursos/:categorySlug" element={<CoursesPage />} />
          <Route path="/curso/:slug" element={<CourseDetailPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/parceiros" element={<PartnersPage />} />
          <Route path="/seja-parceiro" element={<BecomePartnerPage />} />
          <Route path="/retorno-estrategia" element={<StrategyReturnPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
