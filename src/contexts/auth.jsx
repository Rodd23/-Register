import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const token = "token";
export const isAuthenticated = () => localStorage.getItem(token) !== null;

export function AuthProvider(props) {
  const [user, setUser] = useState({});

  async function signIn({token, user}) {

    localStorage.setItem("token", token);
    
    const userData = user;
    
    for (const key of Object.keys(userData)) {
        localStorage.setItem(key, userData[key]);
    }
    
    api.defaults.headers.common.authorization = `${token}`;
    
    setUser(userData);
  }

  async function signOut() {
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("lastname");
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
    localStorage.removeItem("id");
    await api.post("logout");
  }



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common.authorization = `${token}`;
      setUser({...localStorage})
    } else {
        setUser({})
    }
  }, []);

 

  return (
    <AuthContext.Provider value={{ signIn, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
