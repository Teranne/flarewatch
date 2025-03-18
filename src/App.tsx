
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth-context";
import { ProfileProvider } from "@/contexts/profile-context";

// Pages
import Index from "./pages/Index";
import Detail from "./pages/Detail";
import Player from "./pages/Player";
import Catalog from "./pages/Catalog";
import ProfilesPage from "./pages/ProfilesPage";
import UserAccount from "./pages/UserAccount";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProfileProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Index />} />
              
              {/* Media types */}
              <Route path="/movies" element={<Catalog />} />
              <Route path="/movies/:subcategory" element={<Catalog />} />
              <Route path="/movies/:subcategory/:id" element={<Catalog />} />
              <Route path="/tv-shows" element={<Catalog />} />
              <Route path="/tv-shows/:subcategory" element={<Catalog />} />
              <Route path="/tv-shows/:subcategory/:id" element={<Catalog />} />
              <Route path="/trending" element={<Catalog />} />
              <Route path="/search" element={<Catalog />} />
              
              {/* Details and player */}
              <Route path="/movie/:id" element={<Detail />} />
              <Route path="/tv/:id" element={<Detail />} />
              <Route path="/movie/:id/play" element={<Player />} />
              <Route path="/tv/:id/play" element={<Player />} />
              <Route path="/tv/:id/play/:season/:episode" element={<Player />} />
              
              {/* User profile and account */}
              <Route path="/profiles" element={<ProfilesPage />} />
              <Route path="/profiles/:action" element={<ProfilesPage />} />
              <Route path="/profiles/:action/:id" element={<ProfilesPage />} />
              <Route path="/account" element={<UserAccount />} />
              <Route path="/watchlist" element={<UserAccount />} />
              
              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ProfileProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
