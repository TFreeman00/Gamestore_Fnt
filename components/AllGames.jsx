import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllGamesQuery } from "../api/gamesApi";
import { Link } from "react-router-dom";

const AllGames = () => {
  const { data } = useGetAllGamesQuery(); // making api call
  const { games } = useSelector((state) => state.gameSlice); // making call to state

  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;

  // Logic to get games for current page
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  // Logic for page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(games.length / gamesPerPage); i++) {
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
          <div key={game.id} className="bg-white shadow-md rounded-lg p-6">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
            <h2 className="text-gray-600 mb-2">${game.price}</h2>
            <p className="text-gray-500 mb-4">{game.description}</p>
            <Link
              to={`/games/${game.id}`}
              className="text-blue-500 hover:underline"
            >
              See Detail
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={`mx-1 px-3 py-1 rounded-full border ${
              currentPage === number ? "bg-gray-300" : ""
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
