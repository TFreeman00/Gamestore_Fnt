import React from "react";

const GameCard = ({ game, pageType, addToCartHandler, onClick }) => {
  let imageSizeClass;

  switch (pageType) {
    case "landing":
      imageSizeClass = "h-30 w-30";
      break;
    case "single":
      imageSizeClass = "h-30 w-30";
      break;
    case "all":
      imageSizeClass = "h-30 w-30";
      break;
    default:
      imageSizeClass = "h-30 w-30";
  }

  const handleClick = () => {
    // Call the onClick callback function passed from the parent component
    if (onClick) {
      onClick(game.id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={game.image}
        alt={game.title}
        className={`w-full ${imageSizeClass} object-cover object-center cursor-pointer`}
        onClick={handleClick}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
        {pageType !== "landing" && (
          <p className="text-gray-700 mb-4">{game.description}</p>
        )}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Price: ${game.price}</span>
          {pageType !== "single" && (
            <button
              onClick={() => addToCartHandler(game.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          )}
        </div>
        {pageType === "single" && (
          <p className="text-gray-700 mt-2">Release Date: {game.releaseDate}</p>
        )}
      </div>
    </div>
  );
};

export default GameCard;
