import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AboutPage from "@/pages/AboutPage";
import AdminDashboard from "@/pages/AdminDashboard";
import BiodataForm from "@/pages/BiodataForm";
import BiodataPreview from "@/pages/BiodataPreview";
import LandingPage from "@/pages/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});
const rootRoute = createRootRoute({ component: () => <Outlet /> });
const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
const formRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/form",
  component: BiodataForm,
});
const previewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/preview",
  component: BiodataPreview,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const routeTree = rootRoute.addChildren([
  landingRoute,
  formRoute,
  previewRoute,
  adminRoute,
  aboutRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <RouterProvider router={router} />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
