import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../slice/authSlice";
import { Disclosure } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { users } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setToken(null));
    window.sessionStorage.removeItem("authToken");
    navigate("/");
  };

  const handleSearch = () => {
    navigate(`/games?search=${searchQuery}`);
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 flex justify-between items-center bg-">
            <a
              href="/"
              className="text-black font-bold text-lg hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-4 py-2"
            >
              GameStore
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
                onClick={() => navigate("/cart")}
                className="text-black hover:text-gray-300 bg-gray hover:bg-blue-700 duration-300 rounded-md px-4 py-2"
              >
                Cart
              </button>
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
                className="block w-64 sm:w-80 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSearch}
                className="relative inset-y-0 right-0 flex items-center justify-center px-4 text-gray-600 bg-white"
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
