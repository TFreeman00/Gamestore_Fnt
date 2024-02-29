import React from "react";

function Hero() {
  return (
    <section className="hero bg-cover bg-center h-screen relative">
      {/* Replace with your desired background image */}
      <img
        src="https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/8dfd10b5-d995-4ae5-9592-365e8927eddb/Default_Super_Mario_world_game_cover_0.jpg"
        alt="Hero image"
        className="w-full h-full object-cover absolute opacity-25"
      />
      <div className="container mx-auto px-4 py-24 flex items-center justify-center h-full">
        <div className="text-center text-blue">
          {/* Customize text and styling as needed */}
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Your Game Store!
          </h1>
          <p className="text-xl leading-relaxed mb-8">
            Discover a vast collection of games for every genre and platform.
          </p>
          <a href="/products" className="btn btn-primary">
            Explore Games
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
