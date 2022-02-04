import React, { useEffect, useState } from "react";
import api from "../services/api";
export const SessionContext = React.createContext({});

export function SessionProvider(props) {
  const [user, setUser] = useState({});
  
  const userToken = localStorage.getItem("token");
  api.defaults.headers.Authorization = `${userToken}`;

  useEffect(() => {
    if (userToken) {
      setUser({ ...localStorage });
      
    }else{
      
      setUser({});
    } 
  }, [userToken]);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {props.children}
    </SessionContext.Provider>
  );
}

export const useSession = () => React.useContext(SessionContext);