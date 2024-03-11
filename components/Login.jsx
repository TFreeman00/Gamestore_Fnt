import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../api/authApi";
import { useSessionAddToCartMutation } from "../api/cartApi";

export default function Login() {
  const [cart] = useSessionAddToCartMutation();
  const navigate = useNavigate();
  const [login] = useLoginUserMutation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await login(form);

    if (result.error) {
      alert("Invalid login credentials");
    } else if (!result.error && window.sessionStorage.cart) {
      let session = JSON.parse(window.sessionStorage.cart).map((cart) => ({
        productid: Number(cart.productid),
        userid: result.data.user.id,
      }));
      cart({ cart: session, token: result.data.token });
      window.sessionStorage.removeItem("cart");
      window.sessionStorage.removeItem("counter");
    }
    result.error ? navigate("/auth/login") : navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="flex flex-col">
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </label>
        <label className="flex flex-col">
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            className="border border-gray-300 rounded-md p-2"
            required
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
