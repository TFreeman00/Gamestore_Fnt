import React, { useState } from "react";
import { useUpdateUserMutation } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const { id } = useParams();
  const { users, token } = useSelector((state) => state.authSlice);
  // const { users, token } = useSelector((state) => state.usersSlice);
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
    <>
      <div>
        <h2>Update User Info:</h2>
        <form onSubmit={onSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={onChange}
            ></input>
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={onChange}
            ></input>
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
            ></input>
          </label>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
