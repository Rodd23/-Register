import React, { createContext } from "react";
import useAuth from './hooks/useAuth';

const Context = createContext({});

const AuthProvider = ({ children }) => {
  const { loading, user, authenticated, handleLogin, handleLogout } = useAuth();
  
  return (
    <Context.Provider value={{ loading, user, authenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider }