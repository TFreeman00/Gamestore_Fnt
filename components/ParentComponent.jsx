import React from "react";
import GameCard from "./GameCard";

const ParentComponent = () => {
  const navigateToSingleGame = (gameId) => {
    // Navigate to single game page using any preferred method
    console.log(`Navigating to single game with ID: ${gameId}`);
  };

  return (
    <div>
      {/* Example usage of GameCard */}
      <GameCard
        game={{ id: 123, title: "Sample Game", image: "sample.jpg", price: 10 }}
        pageType="landing"
        onClick={navigateToSingleGame}
        addToCartHandler={(gameId) =>
          console.log(`Adding game with ID ${gameId} to cart`)
        }
      />
    </div>
  );
};

export default ParentComponent;
