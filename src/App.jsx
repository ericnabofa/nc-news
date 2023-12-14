import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Home from "../Components/Home";
import Feature from "../Components/Feature";
import SingleArticle from "../Components/SingleArticle";
import { UserProvider } from "../Components/UserContext";


function App() {
    const loggedInUser = 'tickle122'

  return (
    <UserProvider value={loggedInUser}>
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
     </UserProvider>
  );
}

export default App;
