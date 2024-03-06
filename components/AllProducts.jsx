import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGamesAsync,
  fetchCoversAsync,
  fetchVideosAsync,
} from "../slice/productSlice";
import ProductCard from "./ProductCard";

function AllProducts() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchGamesAsync())
      .then(() => dispatch(fetchCoversAsync()))
      .then(() => dispatch(fetchVideosAsync()))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const products = useSelector((state) => state.games.games);
  const covers = useSelector((state) => state.games.covers);
  const videos = useSelector((state) => state.games.videos);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : products.length > 0 ? (
          products.map((product) => {
            const cover = covers.find((cover) => cover.game === product.id);
            const video = videos.find((video) => video.game === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                cover={cover}
                video={video}
              />
            );
          })
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default AllProducts;

