import { useState, useEffect } from "react";

import api from "../../services/api";
import history from "../../history";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `${token}`;
      setAuthenticated(true);
      setUser({...localStorage});
    }

    setLoading(false);
    setUser({});
  }, []);

  async function handleLogin({ token, user }) {
    
    localStorage.setItem("token", JSON.stringify(token));

    const userData = user;
    
    for( const key of Object.keys(userData)) {
      localStorage.setItem(key, userData[key]);
    }

    api.defaults.headers.Authorization = `${token}`;
    setAuthenticated(true);
    history.push("/dashboard");

  }

  async function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    await api.post("/logout");
    history.push("/");
  }

  return { authenticated, loading, user, handleLogin, handleLogout };
}
