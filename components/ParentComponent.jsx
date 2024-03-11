import React from "react";
import { useHistory } from "react-router-dom";

const ParentComponent = () => {
  const history = useHistory();

  const addToCartHandler = (gameId) => {
    console.log(`Add game with ID ${gameId} to cart`);
    // Implement your logic to add the game to the cart
  };

  const navigateToSingleGame = (gameId) => {
    console.log(`Navigating to SingleGame with game ID: ${gameId}`);
    history.push(`/single/${gameId}`);
  };

  return (
    <div>
      <GameCard
        game={gameData} // Make sure gameData is correctly passed
        pageType="landing"
        addToCartHandler={addToCartHandler} // Ensure that addToCartHandler is passed
        onClick={navigateToSingleGame} // Ensure that navigateToSingleGame is passed
      />
    </div>
  );
};

export default ParentComponent;
