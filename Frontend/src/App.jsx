import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home.jsx";
import Navbar from "./views/navbar.jsx";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="https://stecuproductions.github.io/torebki/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
