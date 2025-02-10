import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home.jsx";
import Navbar from "./views/navbar.jsx";
import LoadingScreen from "./views/LoadingScreen.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        < Route path="/" element={<Home />} />
      </Routes>

    </>
  );
}

export default App;
