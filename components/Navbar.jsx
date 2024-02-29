import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <a href="/" className="text-xl font-bold">
        Video Game Store
      </a>
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
        </li>
        <li>
          <a href="/featured-games" className="hover:text-gray-400">
            Featured Games
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
