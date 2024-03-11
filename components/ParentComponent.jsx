import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../slice/gameSlice";
import GameCard from "./GameCard";

const SingleGame = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) =>
    state.games.games.find((g) => g.id === gameId)
  );
  const status = useSelector((state) => state.games.status);

  useEffect(() => {
    dispatch(fetchGameById(gameId));
  }, [dispatch, gameId]);

  const addToCartHandler = (gameId) => {
    console.log(`Adding game ${gameId} to cart`);
  };

  const handleClick = (gameId) => {
    console.log(`Clicked on game ${gameId}`);
    // Navigate to the SingleGame page for the clicked game
    // You can implement navigation logic here
  };

  return (
    <div className="container mx-auto">
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "failed" ? (
        <p>Error fetching game</p>
      ) : (
        <GameCard
          game={game}
          pageType="single"
          addToCartHandler={addToCartHandler}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default SingleGame;
