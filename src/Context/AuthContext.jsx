import React, { useEffect, useState, createContext, useContext } from "react";

export const SessionContext = createContext({})

export function SessionProvider (props) {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const userToken = localStorage.getItem("@teste-Token");

    if(userToken) setUser({ ...localStorage });
    else setUser({})
  }, [])

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);