import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative">
      <img
        src="https://getwallpapers.com/wallpaper/full/1/d/f/1088927-beautiful-cool-gaming-backgrounds-1920x1080-for-iphone-6.jpg"
        alt="Hero image"
        className="w-full h-full object-cover opacity-25 absolute inset-0"
      />

      <div className="bg-white opacity-25 absolute inset-0"></div>

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Your Game Store!
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-8">
            Discover a vast collection of games for every genre and platform.
          </p>

          <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/yBp5mXHxY94?si=dbBjcc0wT12h1gDW"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <Link
            to="/games"
            className="inline-block bg-blue text-white rounded-md px-6 py-3 text-lg transition duration-300 ease-in-out hover:bg-blue-700"
          >
            Explore Games
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
