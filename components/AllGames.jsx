import React from "react";
import { useSelector } from "react-redux";
import { useGetAllGamesQuery } from "../api/gamesApi";
import { Link } from "react-router-dom";

const AllGames = () => {
  const { data } = useGetAllGamesQuery(); // making api call
  const { games } = useSelector((state) => state.gameSlice); // making call to state

  return (
    <>
      <div className="container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => {
          return (
            <div key={game.id}>
              <img src={game.image} alt={game.title} />
              <h2>{game.title} </h2>
              <h2>${game.price}</h2>
              <h2>{game.description}</h2>
              <Link to={`/games/${game.id}`}>See Detail</Link>
              <img src="" alt="" />
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default AllGames;
