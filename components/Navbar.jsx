import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import { setToken } from "../slice/authSlice";
import { updateCartItemCount } from "../slice/cartSlice";

const imageUrl =
  "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/bb35b511-42c3-4289-b73e-0a73df123d3d/variations/Default_A_cute_video_game_store_mascot_masterfully_crafted_Hi_0_bb35b511-42c3-4289-b73e-0a73df123d3d_0.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, users } = useSelector((state) => state.authSlice);
  const { cart } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    dispatch(updateCartItemCount());
  }, [dispatch]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []); 

  const logout = () => {
    dispatch(setToken(null));
    window.sessionStorage.removeItem("authToken");
    setShowLogoutMessage(true); 
    setTimeout(() => setShowLogoutMessage(false), 3000);
    navigate("/");
  };

  const handleSearch = () => {
    navigate(`/games?search=${searchQuery}`);
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 lg:px-8 sm:inline flex flex-wrap justify-between items-center">
        <a
          href="/"
          className="text-black font-bold text-lg hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-4 py-2 flex items-center mb-4 sm:mb-0"
        >
          <img src={imageUrl} alt="Icon" className="flex sm:inline justify-start gap-2 w-9 h-9 mr-4" /> VGstore
        </a>
        <div className="flex items-center mt-3 ml-1 text-lg space-x-4 mb-4 sm:mb-0">
          {token && (
            <span className="sm:inline ml-3 text-black">
              Welcome, {users.firstname}!
            </span>
          )}
          {!token ? (
            <>
              <button
                onClick={() => navigate("/auth/login")}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth/register")}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4"
              >
                Register
              </button>
              {showLogoutMessage && (
                <p className="text-red-500">You are logged out</p>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth/me")}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4"
              >
                Account
              </button>
              <button
                onClick={logout}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4"
              >
                Logout
              </button>
            </>
          )}
          {token && users.isadmin && (
            <button
              onClick={() => navigate("/users")}
              className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4"
            >
              User
            </button>
          )}
          {token && users.isadmin && (
            <button
              onClick={() => navigate("/admin")}
              className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4"
            >
              Admin Dashboard
            </button>
          )}
          <button
            onClick={() => navigate("/games")}
            className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4"
          >
            Games
          </button>
        </div>
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search..."
              className="block w-32 sm:w-40 px-2 py-2 sm:px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-0 flex items-center justify-right px-4 text-gray-600 bg-transparent"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => navigate("/cart")}
            className="text-black hover:text-gray-300 bg-gray duration-300 rounded-md px-2 py-2 sm:px-4 relative"
          >
            <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="absolute top-0 right-0 mt-0.5 mr-0.5 text-blue-500 rounded-full px-1.5 sm:px-2 py-0.5 text-xs sm:text-lg">
              {cart.length}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
