import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { setToken } from "../slice/authSlice";
import { updateCartItemCount } from "../slice/cartSlice";

const imageUrl =
  "https://cdn.leonardo.ai/users/2ca1195f-47ce-42dd-9179-f8d8269808f8/generations/bb35b511-42c3-4289-b73e-0a73df123d3d/variations/Default_A_cute_video_game_store_mascot_masterfully_crafted_Hi_0_bb35b511-42c3-4289-b73e-0a73df123d3d_0.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, users } = useSelector((state) => state.authSlice);
  const { cartItemCount } = useSelector((state) => state.cartSlice);

  useEffect(() => {
    dispatch(updateCartItemCount());
  }, [dispatch]);

  useEffect(() => {
    const storedCartLength = sessionStorage.getItem("cartLength");
    if (storedCartLength) {
      dispatch(updateCartItemCount(parseInt(storedCartLength)));
    }
  }, [dispatch]);

  useEffect(() => {
    sessionStorage.setItem("cartLength", cartItemCount.toString());
  }, [cartItemCount]);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gray-300 drop-shadow">
      <div className="flex h-16 justify-between">
        <div className="flex relative justify-start mr-6 mt-2">
          <a
            href="/"
            className="text-black font-bold text-lg hover:text-blue-700 bg-transparent duration-300 rounded-md px-4 py-2 flex items-center mb-4 sm:mb-0 hover:animate-pulse"
          >
            <img
              src={imageUrl}
              alt="Icon"
              className="flex sm:inline justify-start gap-2 w-9 h-9 mr-4"
            />{" "}
            VGstore
          </a>
        </div>
        <div className="hidden sm:flex items-center mt-3 ml-1 text-lg space-x-4 mb-4 sm:mb-0">
          {token && (
            <span className="sm:inline ml-3 5068text-black animate-pulse">
              Welcome, {users.firstname}!
            </span>
          )}
          {!token ? (
            <>
              <button
                onClick={() => navigate("/auth/login")}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4 hover:animate-pulse"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth/register")}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4 hover:animate-pulse"
              >
                Register
              </button>
              {showLogoutMessage && (
                <p className="text-blue-500 animate-bounce duration-300 ease-in-out">
                  You are logged out
                </p>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth/me")}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4 hover:animate-pulse"
              >
                Account
              </button>
              <button
                onClick={logout}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4 hover:animate-pulse"
              >
                Logout
              </button>
            </>
          )}
          {token && users.isadmin && (
            <button
              onClick={() => navigate("/users")}
              className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4 hover:animate-pulse"
            >
              User
            </button>
          )}
          {token && users.isadmin && (
            <button
              onClick={() => navigate("/admin")}
              className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4 hover:animate-pulse"
            >
              Admin Dashboard
            </button>
          )}
          <button
            onClick={() => navigate("/games")}
            className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 sm:px-4 hover:animate-pulse"
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
              className="block w-32 sm:w-40 px-2 py-2 sm:px-4 rounded-md border border-gray-300 mt-2 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-0 flex mt-2 items-center justify-right px-4 text-gray-600 bg-transparent"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => navigate("/cart")}
            className="text-black hover:text-gray-300 bg-gray duration-300 rounded-md px-2 py-2 sm:px-4 relative"
          >
            <ShoppingCartIcon className="h-6 w-6 sm:h-6 sm:w-6 mt-3" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 mr-0.5 text-blue-500 rounded-full mt-2 px-1.5 sm:px-2 py-0.5 text-xs sm:text-lg">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
        <div className="sm:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-black hover:text-gray-300 bg-gray duration-300 rounded-md px-2 py-2 sm:px-4"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          {isMobileMenuOpen && (
            <div className=" top-16 right-0 bg-gray-300 rounded-md shadow-lg mt-2">
              <div className="flex flex-col p-4 space-y-2">
                {token && (
                  <span className="text-black animate-pulse">
                    Welcome, {users.firstname}!
                  </span>
                )}
                {!token ? (
                  <>
                    <button
                      onClick={() => navigate("/auth/login")}
                      className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 hover:animate-pulse"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/auth/register")}
                      className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 hover:animate-pulse"
                    >
                      Register
                    </button>
                    {showLogoutMessage && (
                      <p className="text-blue-500 animate-bounce duration-300 ease-in-out">
                        You are logged out
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/auth/me")}
                      className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 hover:animate-pulse"
                    >
                      Account
                    </button>
                    <button
                      onClick={logout}
                      className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 hover:animate-pulse"
                    >
                      Logout
                    </button>
                  </>
                )}
                {token && users.isadmin && (
                  <button
                    onClick={() => navigate("/users")}
                    className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 hover:animate-pulse"
                  >
                    User
                  </button>
                )}
                {token && users.isadmin && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 hover:animate-pulse"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={() => navigate("/games")}
                  className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-2 py-2 hover:animate-pulse"
                >
                  Games
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
