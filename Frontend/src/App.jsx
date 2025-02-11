import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./views/navbar";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
