import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Home from "../Components/Home";
import Feature from "../Components/Feature";
import SingleArticle from "../Components/SingleArticle";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <NavBar />
        <section className="content-page">
        <Routes>
          <Route path="*" element={<Home />}/>
          <Route path="/:feature" element={<Feature />}/>
          <Route path="/:feature/:articleId" element={<SingleArticle />} />
        </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
