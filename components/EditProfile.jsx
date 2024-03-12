import React, { useState } from "react";
import { useUpdateUserMutation } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.authSlice);
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await updateUser({
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
    <div className="bg-gray-100 p-4">
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
          />
        </label>
        <label className="block mt-2">
          Last Name:
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={onChange}
            className="block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
          />
        </label>
        <label className="block mt-2">
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            className="block w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
          />
        </label>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
