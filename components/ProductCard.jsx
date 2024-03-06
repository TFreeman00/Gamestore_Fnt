import React from "react";

function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
      <a
        href={`/products/${product.id}`}
        className="block group-hover:opacity-75"
      >
        <img
          src={
            product.cover
              ? `https://images.igdb.com/igdb/image/upload/cover_small/${image_id}`
              : "placeholder.png"
          }
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </a>
      <h3 className="text-lg font-medium mb-2">{product.name}</h3>
      {/* Add additional product details as needed */}
      {/* Example: Price, rating, etc. */}
    </div>
  );
}

export default ProductCard;
