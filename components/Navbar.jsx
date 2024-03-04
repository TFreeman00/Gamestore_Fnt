import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../slice/authSlice";
// import { Fragment } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const { users } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setToken(null));
    navigate("/");
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>

        {!token && (
          <>
            <button
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Login
            </button>

            <button
              onClick={() => {
                navigate("/auth/register");
              }}
            >
              Register
            </button>
          </>
        )}
        {token && (
          <>
            <button
              onClick={() => {
                navigate("/auth/me");
              }}
            >
              Account
            </button>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {token && users.isadmin && (
          <>
            <button
              onClick={() => {
                navigate("/users");
              }}
            >
              User
            </button>
          </>
        )}

        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          Cart
        </button>
      </div>
    </div>
  );
}
