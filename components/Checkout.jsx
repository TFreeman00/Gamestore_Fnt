import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import CheckoutForm from "./CheckoutForm";
import { useGetGameByIdQuery } from "../api/gamesApi";

const Checkout = () => {
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const gameId = queryParams.get("id"); 

  useEffect(() => {
    // Fetch game data only if gameId is not null
    if (gameId) {
   
      const { error } = useGetGameByIdQuery(gameId); 
      if (error) {
        console.error("Error fetching game:", error);
      }
    }
  }, [gameId]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <hr className="my-4" />
      {gameId ? (
        <CheckoutForm gameId={gameId} /> 
      ) : (
        <p>No game selected for checkout.</p>
      )}
    </div>
  );
};

export default Checkout;
