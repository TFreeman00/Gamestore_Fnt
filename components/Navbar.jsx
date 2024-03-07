import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../slice/authSlice";
const Navbar = () => {
  const { users } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setToken(null));
    navigate("/");
  };
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <a href="/" className="text-black font-bold text-lg">
          GameStore
        </a>
        <div className="flex items-center space-x-4">
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
          <button
            onClick={() => navigate("/cart")}
            className="text-black hover:text-gray-300 bg-gray-500 hover:bg-gray-700 rounded-md px-4 py-2"
          >
            Cart
          </button>
          <button
            onClick={() => navigate("/products")}
            className="text-black hover:text-gray-300 bg-indigo-500 hover:bg-indigo-700 rounded-md px-4 py-2"
          >
            Games
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
