import React, { useEffect, useState } from "react";

export const SessionContext = React.createContext({});

export function SessionProvider(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userToken = localStorage.getItem("@token");

    if (userToken) setUser({ ...localStorage });
    else setUser({});
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {props.children}
    </SessionContext.Provider>
  );
}

export const useSession = () => React.useContext(SessionContext);