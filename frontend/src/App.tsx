import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Lazy load components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Agents = lazy(() => import("./pages/Agents"));
const Mortgage = lazy(() => import("./pages/Mortgage"));
const Admin = lazy(() => import("./pages/Admin"));
const Buy = lazy(() => import("./pages/Buy"));
const Rent = lazy(() => import("./pages/Rent"));
const Sell = lazy(() => import("./pages/Sell"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const CreateProperty = lazy(() => import("./pages/CreateProperty"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="/properties"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Properties />
                  </Suspense>
                }
              />
              <Route
                path="/property/:id"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <PropertyDetail />
                  </Suspense>
                }
              />
              <Route
                path="/agents"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Agents />
                  </Suspense>
                }
              />
              <Route
                path="/mortgage"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Mortgage />
                  </Suspense>
                }
              />
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Admin />
                  </Suspense>
                }
              />
              <Route
                path="/buy"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Buy />
                  </Suspense>
                }
              />
              <Route
                path="/rent"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Rent />
                  </Suspense>
                }
              />
              <Route
                path="/sell"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Sell />
                  </Suspense>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <PrivacyPolicy />
                  </Suspense>
                }
              />
              <Route
                path="/terms-of-service"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <TermsOfService />
                  </Suspense>
                }
              />
              <Route
                path="/cookie-policy"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <CookiePolicy />
                  </Suspense>
                }
              />
              <Route
                path="/login"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <LoginPage />
                  </Suspense>
                }
              />
              <Route
                path="/register"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <RegisterPage />
                  </Suspense>
                }
              />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProfilePage />
                  </Suspense>
                }
              />
              <Route
                path="/create-property"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <CreateProperty />
                  </Suspense>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;
