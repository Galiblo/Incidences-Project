import { useState } from "react";
import "./App.css";
import Home from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/NavBar";
import About from "./components/About";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PasswordResetRequest from "./components/PasswordResetRequest";
import PasswordReset from "./components/PasswordReset";

function App() {
  const location = useLocation();
  const noNavbar =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/request/password_reset" || location.pathname.includes("password-reset")

  return (
    <>
      {noNavbar ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/request/password_reset"
            element={<PasswordResetRequest />}
          />
          <Route path="/password-reset/:token" element={<PasswordReset />} />
        </Routes>
      ) : (
        <Navbar
          content={
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Route>
            </Routes>
          }
        />
      )}
    </>
  );
}

export default App;
