import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../api/end-point.api";
import type { AuthUser } from "../types/api-response.interface";

export function useAuth() {
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // load từ localStorage khi mở app
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
     setLoading(false);
  }, []);

  const login = async (identifier: string, password: string) => {
    const res = await AuthApi.login({ identifier, password });
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setToken(token);

    // nếu là admin → vào admin, ngược lại → vào home
    if (user.role === "Admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const register = async (username: string, email: string, password: string) => {
    return AuthApi.register({ username, email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/"); // về trang chủ
  };

  const isAdmin = user?.role === "Admin";
  const isLoggedIn = !!user;

  return { user, token, isAdmin, isLoggedIn, login, register, logout, loading };
}
