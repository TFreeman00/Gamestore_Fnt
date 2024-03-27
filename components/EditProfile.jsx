import React, { useState } from "react";
import { useUpdateUserMutation } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function EditProfile() {
  const { id } = useParams();
  const { users, token } = useSelector((state) => state.authSlice);
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id,
    firstname: "",
    lastname: "",
    password: "",
  });
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const result = updateUser({
      id,
      firstname: form.firstname,
      lastname: form.lastname,
      password: form.password,
      token,
    });
    console.log(result);
    navigate("/auth/me");
  };
  return (
    <div
      style={{
        backgroundImage: `url('https://i.pinimg.com/originals/42/b9/01/42b901d96c8588f3aa95f1492a3648ae.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="container max-w-md w-full mx-4 md:mx-auto p-8 bg-white shadow-md rounded-lg"
        style={{ opacity: 0.9 }}
      >
        <h2 className="text-lg font-bold">Update User Info:</h2>
        <form onSubmit={onSubmit} className="mt-4">
          <label className="block">
            First Name:
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={onChange}
              className="block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
            ></input>
          </label>
          <label className="block mt-2">
            Last Name:
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={onChange}
              className="block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
            ></input>
          </label>
          <label className="block mt-2">
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
              className="block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
            ></input>
          </label>
          <button className="text-black hover:bg-blue mt-3 hover:text-white bg-transparent border rounded-md px-3 py-1 transition duration-300 ease-in-out">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
