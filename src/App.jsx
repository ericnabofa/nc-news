import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Home from "../Components/Home";
import Feature from "../Components/Feature";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <NavBar />
        <Routes>
          <Route
            path="*"
            element={
              <div className="content-page">
                <Home />
              </div>
            }
          />
          <Route
            path="/:feature"
            element={
              <div className="content-page">
                <Feature />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
