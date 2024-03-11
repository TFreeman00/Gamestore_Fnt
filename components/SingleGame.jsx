import React from "react";
import { useSelector } from "react-redux";

function SingleProduct({ productId }) {
  // Select the specific product from the Redux store using a selector
  const product = useSelector((state) =>
    state.games.games.find((game) => game.id === productId)
  );
  return (
    <div className="product-page">
      {product ? (
        <productId product={product} />
      ) : (
        <p className="text-center">Product not found.</p>
      )}
    </div>
  );
}
export default SingleProduct;
