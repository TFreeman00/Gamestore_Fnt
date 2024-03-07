import React, { useState } from "react";
import { useRegisterUserMutation } from "../api/authApi";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [addNewUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const results = addNewUser(form);
    navigate("/auth/me");
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl text-center font-bold mb-4">Register</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="flex flex-col">
          First Name:
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="flex flex-col">
          Last Name:
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="flex flex-col">
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="flex flex-col">
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            required
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
