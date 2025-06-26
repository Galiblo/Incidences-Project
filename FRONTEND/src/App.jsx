import { useState } from "react";
import "./App.css";
import Home from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/NavBar";
import About from "./components/About";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const noNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {noNavbar ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <Navbar
          content={
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          }
        />
      )}
    </>
  );
}

export default App;
