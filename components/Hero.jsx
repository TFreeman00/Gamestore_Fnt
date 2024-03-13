import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Hero() {
  return (
    <section className="hero bg-cover bg-center h-screen relative">
      {/* Background Image */}
      <img
        src="https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/8dfd10b5-d995-4ae5-9592-365e8927eddb/Default_Super_Mario_world_game_cover_0.jpg"
        alt="Hero image"
        className="w-full h-full object-cover absolute opacity-25"
      />
      {/* Background Overlay */}
      <div className="bg-black bg-opacity-80 absolute inset-0"></div>
      <div className="container mx-auto px-4 py-24 flex items-center justify-center h-full relative z-10">
        <div className="text-center text-black">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Your Game Store!
          </h1>
          {/* Description */}
          <p className="text-xl leading-relaxed mb-8">
            Discover a vast collection of games for every genre and platform.
          </p>
          {/* Call-to-Action Button */}
          <Link
            to="/games" // Link to the "All Games" page
            className="bg-indigo-600 hover:bg-indigo-700 text-black font-semibold py-3 px-6 rounded-md transition duration-300"
          >
            Explore Games
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
