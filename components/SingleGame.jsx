import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetGameByIdQuery, useUpdateGameMutation } from "../api/gamesApi";
import { useAddToCartMutation } from "../api/cartApi";

function SingleGame() {
  const { id } = useParams();
  const [updateGame] = useUpdateGameMutation();
  const [addToCart] = useAddToCartMutation();
  const { data } = useGetGameByIdQuery(id);
  const { game } = useSelector((state) => state.gameSlice);
  const { users, token } = useSelector((state) => state.authSlice);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    if (!token) {
      if (window.sessionStorage.cart) {
        const cart = JSON.parse(window.sessionStorage.cart);
        cart.push({
          id: data?.id,
          title: data?.title,
          url: data?.image,
          price: data?.price,
        });
        window.sessionStorage.setItem("cart", JSON.stringify(cart));
      } else {
        window.sessionStorage.setItem(
          "cart",
          JSON.stringify([
            {
              id: data?.id,
              title: data?.title,
              url: data?.image,
              price: data?.price,
            },
          ])
        );
      }
    } else {
      addToCart({
        productid: Number(data?.id),
        token,
      })
        .then(() => {
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative bg-white shadow-md rounded-lg p-4">
          <img
            src={game?.image || data?.image}
            alt={game?.title || data?.title}
            className="w-full h-52 object-cover mb-4 rounded-lg"
          />
          <h1 className="text-xl font-semibold mb-2">
            {game?.title || data?.title}
          </h1>
          <h2 className="text-gray-600 mb-2">${game?.price || data?.price}</h2>
          <p className="text-gray-500 mb-4">
            {game?.description || data?.description}
          </p>
          <h2 className="text-gray-600 mb-2">
            Genre: {game?.genre || data?.genre}
          </h2>
          <h2 className="text-gray-600 mb-2">
            Platform: {game?.platform || data?.platform}
          </h2>
          <h2 className="text-gray-600 mb-2">
            First Release Date:{" "}
            {game?.first_release_date || data?.first_release_date}
          </h2>
          <button
            onClick={() => {
              window.open(game?.trailer, "_blank");
            }}
            className="relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 ease-in-out"
          >
            Watch The Trailer
          </button>
          <button
            onClick={handleAddToCart}
            className="relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 ease-in-out"
          >
            Add to Cart
          </button>
          {showNotification && (
            <div className="dropdown-notification">Item added to cart</div>
          )}
        </div>
        <div>
          {users && users.isadmin && (
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-8 text-center">Edit Game</h1>
              {/* Edit game form code */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleGame;
