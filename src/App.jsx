import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import AllProducts from "../components/AllProducts";
// import SingleProduct from "../components/SingleProduct";
import Navbar from "../components/Navbar";
import FeaturedGames from "../components/FeaturedGames"; // Import FeaturedGames
import Users from "../components/Users";
import SingleUser from "../components/SingleUser";
import Login from "../components/Login";
import Register from "../components/Register";
import Account from "../components/Account";

function App() {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`/featured-games?page=${currentPage}`);
        const data = await response.json();
        setGames(data.featuredGames);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.log("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:id" element={<SingleUser />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/me" element={<Account />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
