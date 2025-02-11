import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./views/Navbar";
import LoadingScreen from "./views/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.onload = () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) return <LoadingScreen />;

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
