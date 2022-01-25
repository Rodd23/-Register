import { useState, useEffect } from "react";

import api from "../../services/api";
import history from "../../history";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `${token}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(token) {
    
    localStorage.setItem("token", JSON.stringify(token));
    api.defaults.headers.Authorization = `${token}`;
    setAuthenticated(true);
    history.push("/users");
  }

  async function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    await api.post("/logout");
    history.push("/");
  }

  return { authenticated, loading, handleLogin, handleLogout };
}
