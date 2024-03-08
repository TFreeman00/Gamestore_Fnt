import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import AllGames from "../components/AllGames";
import SingleGame from "../components/SingleGame";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import SingleUser from "../components/SingleUser";
import Login from "../components/Login";
import Register from "../components/Register";
import Account from "../components/Account";
import Cart from "../components/Cart";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/games" element={<AllGames />} />
        <Route path="/games/:id" element={<SingleGame />} />
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:id" element={<SingleUser />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/me" element={<Account />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
