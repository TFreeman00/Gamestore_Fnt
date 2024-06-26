import React, { useState, useEffect } from "react";
import { useGetAllGamesQuery } from "../api/gamesApi";
import { Link, useLocation } from "react-router-dom";

const AllGames = () => {
  const [games, setGames] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;

  const { data: allGames = [], error, isLoading } = useGetAllGamesQuery();

  useEffect(() => {
    if (allGames) {
      setGames(allGames);
    }
  }, [allGames]);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredGames.length / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="">
      <div className="mt-10 container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentGames.map((game) => (
          <div
            key={game.id}
            className=" bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <Link to={`/games/${game.id}`}>
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-52 object-cover rounded-t-lg cursor-pointer"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
              <h2 className="text-gray-600 mb-2 ">{game.genre}</h2>
              <h2 className="text-gray-600 mb-2 ">Price: ${game.price}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={`mt-8 mx-1 px-3 py-1 rounded-full border ${
              currentPage === number ? "bg-gray-500 " : ""
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