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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, users, cart } = useSelector((state) => ({
    token: state.authSlice.token,
    users: state.authSlice.users,
    cart: state.cartSlice.cart,
  }));

  useEffect(() => {

    dispatch(updateCartItemCount()); 

    dispatch(updateCartItemCount());

  }, [dispatch]);

  const logout = () => {
    dispatch(setToken(null));
    window.sessionStorage.removeItem("authToken");
    navigate("/");
  };

  const handleSearch = () => {
    navigate(`/games?search=${searchQuery}`);
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        <a
          href="/"
          className="text-black font-bold text-lg hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-4 py-2 flex items-center"
        >
          <img src={imageUrl} alt="Icon" className="w-9 h-9 mr-2" /> VGstore
        </a>
        <div className="flex items-center space-x-4 relative">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/auth/login")}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-4 py-2"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth/register")}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-4 py-2"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth/me")}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-4 py-2"
              >
                Account
              </button>
              <button
                onClick={logout}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-4 py-2"
              >
                Logout
              </button>
            </>
          )}
          {token && users.isadmin && (
            <button
              onClick={() => navigate("/users")}
              className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-4 py-2"
            >
              User
            </button>
          )}
          {token && users.isadmin && (
            <button
              onClick={() => navigate("/admin")}
              className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-4 py-2"
            >
              Admin Dashboard
            </button>
          )}
          <button
            onClick={() => navigate("/games")}
            className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-4 py-2"
          >
            Games
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="block w-40 sm:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSearch}
            className="relative inset-y-0 right-0 flex items-center justify-center px-4 text-gray-600 bg-white"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={() => navigate("/cart")}
          className="text-black hover:text-gray-300 bg-gray duration-300 rounded-md px-4 py-2 relative"
        >
          <ShoppingCartIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 mt-1 mr-1 text-blue-500 rounded-full px-2 py-1 text-lg">
            {cart.length}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;