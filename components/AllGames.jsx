import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllGamesQuery } from "../api/gamesApi";
import { Link, useLocation } from "react-router-dom";

const AllGames = () => {
  const { data } = useGetAllGamesQuery(); // making api call
  const { games } = useSelector((state) => state.gameSlice); // making call to state
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;

  // Function to filter games based on search query
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  // Logic to get games for current page
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  // Logic for page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredGames.length / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Function to change page
  const handleClick = (number) => {
    setCurrentPage(number);
  };

  return (
    <div>
      <div className="container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentGames.map((game) => (
          <div
            key={game.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-52 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
              <h2 className="text-gray-600 mb-2 ">{game.genre}</h2>
              <Link
                to={`/games/${game.id}`}
                className="relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border rounded-md px-3 py-1 transition duration-300 ease-in-out"
              >
                See Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={`mx-1 px-3 py-1 rounded-full border ${
              currentPage === number ? "bg-gray-500" : ""
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllGames;
