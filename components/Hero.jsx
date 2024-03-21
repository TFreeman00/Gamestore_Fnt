import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero bg-cover bg-center relative">
      <img
        src="https://getwallpapers.com/wallpaper/full/1/d/f/1088927-beautiful-cool-gaming-backgrounds-1920x1080-for-iphone-6.jpg"
        alt="Hero image"
        className="w-full h-full object-cover absolute opacity-25"
      />
      {/* Background Overlay */}
      <div className="bg-white opacity-25 absolute inset-0"></div>
      <div className="container mx-auto px-4 py-24 flex items-center justify-center relative z-10">
        <div className="text-center">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Your Game Store!
          </h1>
          {/* Description */}
          <p className="text-xl leading-relaxed mb-8">
            Discover a vast collection of games for every genre and platform.
          </p>
          <div className="w-full md:w-2/3 mx-auto mb-6">
            <iframe
              width="960"
              height="515"
              src="https://www.youtube.com/embed/yBp5mXHxY94?si=dbBjcc0wT12h1gDW"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <br />
          {/* Call-to-Action Button */}
          <Link
            to="/games"
            className="hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-6 py-3 text-lg transition duration-300 ease-in-out"
          >
            Explore Games
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
