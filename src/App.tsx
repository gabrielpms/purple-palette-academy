import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DynamicThemeProvider } from "@/components/DynamicThemeProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AboutPage from "./pages/AboutPage";
import InstructorsPage from "./pages/InstructorsPage";
import InstructorDetailPage from "./pages/InstructorDetailPage";
import BecomePartnerPage from "./pages/BecomePartnerPage";
import StrategyReturnPage from "./pages/StrategyReturnPage";
import SeasonPage from "./pages/SeasonPage";
import LoginPage from "./pages/LoginPage";
import AdminCoursesPage from "./pages/admin/AdminCoursesPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminPartnersPage from "./pages/admin/AdminPartnersPage";
import AdminSeasonsPage from "./pages/admin/AdminSeasonsPage";
import AdminSeasonPillarsPage from "./pages/admin/AdminSeasonPillarsPage";
import AdminFoundersPage from "./pages/admin/AdminFoundersPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminTestimonialsPage from "./pages/admin/AdminTestimonialsPage";
import AdminLeadsPage from "./pages/admin/AdminLeadsPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DynamicThemeProvider>
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
            <Route path="/instrutores" element={<InstructorsPage />} />
            <Route path="/instrutor/:slug" element={<InstructorDetailPage />} />
            <Route path="/seja-parceiro" element={<BecomePartnerPage />} />
            <Route path="/retorno-estrategia" element={<StrategyReturnPage />} />
            <Route path="/temporada/:slug" element={<SeasonPage />} />
            <Route path="/assinatura" element={<SubscriptionPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminCoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categorias"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminCategoriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/parceiros"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPartnersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/temporadas"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminSeasonsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/temporadas/:seasonId/pilares"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminSeasonPillarsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/fundadores"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminFoundersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/configuracoes"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminSettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/depoimentos"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminTestimonialsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/leads"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLeadsPage />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </DynamicThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
