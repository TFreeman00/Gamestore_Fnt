import React from "react";
import { useSelector } from "react-redux";
import { useGetAllGamesQuery } from "../api/gamesApi";
import { Link } from "react-router-dom";
import Hero from "./Hero";

const LandingPage = () => {
  const { data } = useGetAllGamesQuery();
  const { games } = useSelector((state) => state.gameSlice);

  // Fisher-Yates shuffle algorithm to shuffle the games array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the games array
  const shuffledGames = shuffleArray([...games]);

  // Select the first 5 games
  const randomGames = shuffledGames.slice(0, 6);

  return (
    <>
      <Hero />
      <div className="container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {randomGames.map((game) => (
          <div key={game.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
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
          </div>
        ))}
      </div>
    </>
  );
};

export default LandingPage;
