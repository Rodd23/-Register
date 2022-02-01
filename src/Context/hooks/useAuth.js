import api from "../../services/api"
import history from "../../history";

export const TOKEN_KEY = "@teste-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const handleLogin = ({ session, user }) => {

  if (session) localStorage.setItem(TOKEN_KEY, session.token);

  const userData = user;
    
  for( const key of Object.keys(userData)) {
    localStorage.setItem(key, userData[key]);
  }

};

export const handleLogout = async() => {
  localStorage.clear();
  await api.post("/logout");
  history.push("/");
};

