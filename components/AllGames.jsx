// AllGames.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGames } from "../slice/gameSlice";
import GameCard from "./GameCard";

const AllGames = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.games);
  const status = useSelector((state) => state.games.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllGames());
    }
  }, [dispatch, status]);

  return (
    <div className="container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "failed" ? (
        <p>Error fetching games</p>
      ) : (
        games.map((game) => (
          <GameCard key={game.id} game={game} pageType="all" />
        ))
      )}
    </div>
  );
};

export default AllGames;