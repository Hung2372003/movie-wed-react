import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/user/home.page";
import HeaderComponent from "./layouts/header/header.component";
import FooterComponent from "./layouts/footer/footer.component";
import LoginComponent from "./layouts/log-in/log-in.component";
import SignupModal from "./layouts/sign-up/sign-up.component";
import MoviesPage from "./pages/user/movies.page";
import MoviesFavoritesPage from "./pages/user/movie-favorites.page";
import UserProfilePage from "./pages/user/user-profile.page";

// Admin
import AdminLayout from "./layouts/admin-layout/admin-layout.component";
import AdminMoviesPage from "./pages/admin/movies/admin-movies.page";
import AdminEpisodesPage from "./pages/admin/episodes/admin-episodes.page";
import AdminDashboardPage from "./pages/admin/dashboard/admin-dashboard.page";
import AdminUsersPage from "./pages/admin/users/admin-users.page";
import ProtectedRoute from "./components/common/protected-route.component";

import { ToastContainer } from "react-toastify";
export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
     <ToastContainer position="top-right" />
      <LoginComponent isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />

      {!isAdminPage && (
        <HeaderComponent
          onLoginOpen={() => setIsLoginOpen(true)}
          onSignupOpen={() => setIsSignupOpen(true)}
        />
      )}

      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie-favorites" element={<MoviesFavoritesPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />

        {/* Admin routes */}
        <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }>
          {/* ✅ Redirect nếu chỉ vào /admin */}
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="movies" element={<AdminMoviesPage />} />
          <Route path="episodes" element={<AdminEpisodesPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Routes>

      {!isAdminPage && <FooterComponent />}
    </>
  );
}
