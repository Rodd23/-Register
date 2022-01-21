import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StoreContext from "./components/Store/Context";
import { Dashboard } from "./Pages/Dashboard";
import { ErrorPage } from "./Pages/ErrorPage";
import {SignIn} from "./Pages/SignIn"
import { SingnUp } from "./Pages/SignUp";

const PrivateRoute = ({ children }) => {
    const { token } = useContext(StoreContext);

    return token ? children : <Navigate to="/" />
}

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SingnUp />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
