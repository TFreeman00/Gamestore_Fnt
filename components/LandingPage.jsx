import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "./Hero";
import Features from "./Features";
import ProductCard from "./ProductCard"; 
import { fetchGamesAsync } from "../slice/productSlice";
import { selectGames } from "../slice/productSlice";
import { selectLoading } from "../slice/productSlice";
import { selectError } from "../slice/productSlice";


function LandingPage() {
  const dispatch = useDispatch();
  const games = useSelector(selectGames);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  

  useEffect(() => {
    dispatch(fetchGamesAsync());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center">Loading games...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Error fetching games: {error}</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <Features />
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <ProductCard key={game.id} product={game} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
