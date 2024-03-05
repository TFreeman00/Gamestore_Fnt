import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api-v3.igdb.com/games", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer YOUR_IGDB_API_TOKEN", // Replace with your token
          },
          body: JSON.stringify({
            fields: ["name", "cover.url", "first_release_date", "price"],
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
