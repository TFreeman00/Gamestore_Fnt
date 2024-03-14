import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGetUserInfoQuery } from "../api/authApi"; // Import the useGetUserInfoQuery hook
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
import AdminDashboard from "../components/AdminDashboard";
import EditProfile from "../components/EditProfile";

function App() {
  const authToken = window.sessionStorage.getItem("authToken");
  const { data: userInfo, isSuccess } = useGetUserInfoQuery();

  useEffect(() => {
    // Fetch user info when authToken exists
    if (authToken) {
      // Fetch user info
    }
  }, [authToken]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/games" element={<AllGames />} />
        <Route path="/games/:id" element={<SingleGame />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/users/me/:id" element={<EditProfile />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />     
        <Route path="/auth/me" element={<Account />} />     
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
