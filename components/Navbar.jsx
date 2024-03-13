import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../slice/authSlice";
import { Disclosure } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { users } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setToken(null));
    navigate("/");
  };

  const handleSearch = () => {
    // Navigate to search results page with the searchQuery
    navigate(`/games?search=${searchQuery}`);
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 flex justify-between items-center">
            <a href="/" className="text-black font-bold text-lg">
              GameStore
            </a>
            <div className="flex items-center space-x-4 relative">
              {!token ? (
                <>
                  <button
                    onClick={() => navigate("/auth/login")}
                    className="text-black hover:text-gray-300 bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/auth/register")}
                    className="text-black hover:text-gray-300 bg-green-500 hover:bg-green-700 rounded-md px-4 py-2"
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/auth/me")}
                    className="text-black hover:text-gray-300 bg-blue-500 hover:bg-blue-700 rounded-md px-4 py-2"
                  >
                    Account
                  </button>
                  <button
                    onClick={logout}
                    className="text-black hover:text-gray-300 bg-red-500 hover:bg-red-700 rounded-md px-4 py-2"
                  >
                    Logout
                  </button>
                </>
              )}
              {token && users.isadmin && (
                <button
                  onClick={() => navigate("/users")}
                  className="text-black hover:text-gray-300 bg-yellow-500 hover:bg-yellow-700 rounded-md px-4 py-2"
                >
                  User
                </button>
              )}
              {token && users.isadmin && (
                <button
                  onClick={() => navigate("/admin")}
                  className="text-black hover:text-gray-300 bg-yellow-500 hover:bg-yellow-700 rounded-md px-4 py-2"
                >
                  Admin Dashboard
                </button>
              )}
              <button
                onClick={() => navigate("/cart")}
                className="text-black hover:text-gray-300 bg-gray-500 hover:bg-gray-700 rounded-md px-4 py-2"
              >
                Cart
              </button>
              <button
                onClick={() => navigate("/games")}
                className="text-black hover:text-gray-300 bg-indigo-500 hover:bg-indigo-700 rounded-md px-4 py-2"
              >
                Games
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="block w-64 sm:w-80 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSearch}
                className="relative inset-y-0 right-0 flex items-center justify-center px-4 text-gray-600 bg-white hover:bg-gray-100"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
