import api from "./api";

export const TOKEN_KEY = "token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = ({ token, user }) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token); 
  }
  const userData = user;

  for (const key of Object.keys(userData)) {
    localStorage.setItem(key, userData[key]);
  }
};
export const logout = async(props) => {
  localStorage.clear();
  await api.post("/logout");
  props.history.push("/");
  props.history.go();
};