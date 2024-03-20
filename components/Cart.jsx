import React, { useEffect, useState } from "react";
import { useDeleteCartMutation, useGetCartQuery } from "../api/cartApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { token } = useSelector((state) => state.authSlice);
  const [deleteItem] = useDeleteCartMutation();
  const getCart = useGetCartQuery({ token }); 
  const { cart } = useSelector((state) => state.cartSlice);
  const navigate = useNavigate();
  const [session, setSession] = useState({ cart: [] });
  let totalPrice = 0;
  let cartPrice = [];
  useEffect(() => {
    const setCart = () => {
      const data = {
        cart: JSON.parse(window.sessionStorage.cart),
      };
      setSession(data);
    };
    if (!token && window.sessionStorage.cart) setCart();
  }, []);
  if (!token) {
    cartPrice = session.cart;
    cartPrice.forEach((item) => {
      totalPrice += Number(item.price);
    });
  } else {
    cartPrice = cart;
    cartPrice.forEach((item) => {
      totalPrice += Number(item.products.price);
    });
  }
  const checkout = async () => {
    navigate("/checkout");
  };
  const remove = (id) => {
    deleteItem({
      productid: Number(id),
      token,
    });
  };
  return (
    <>
      <h1 className="margintop text-2xl font-semibold">Cart</h1>
      <hr className="my-4" />
      {(!token && session.cart.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {session.cart.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md space-y-2">
              <h3 className="text-lg font-semibold">
                {item.title} - ${item.price}
              </h3>
              <img
                className="h-40 w-40 object-cover"
                src={item.url}
                alt={item.title}
              />
              <button
                id={item.id}
                onClick={(e) => {
                  if (session.cart.length === 1) {
                    window.sessionStorage.removeItem("cart");
                    setSession({ cart: [] });
                    return;
                  }
                  const cart = session.cart.filter(
                    (cartItem) => cartItem.id !== e.target.id
                  );
                  setSession({ cart });
                  window.sessionStorage.setItem("cart", JSON.stringify(cart));
                }}
                className="text-black hover:bg-blue hover:text-white bg-transparent border rounded-md px-3 py-1 transition duration-300 ease-in-out"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )) || (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cart.map((cartItem) => (
            <div
              key={cartItem.id}
              className="bg-gray-100 p-4 rounded-md space-y-2"
            >
              <div className="text-lg font-semibold">
                {cartItem.products.title}
              </div>
              <img
                className="hw-40"
                src={cartItem.products.image}
                alt={cartItem.products.title}
              />
              <div>${cartItem.products.price}</div>
              <button
                id={cartItem.productid}
                onClick={(e) => {
                  remove(e.target.id);
                }}
                className="text-black hover:bg-blue hover:text-white bg-transparent border rounded-md px-3 py-1 transition duration-300 ease-in-out"
              >
                Delete Item
              </button>
            </div>
          ))}
        </div>
      )}
      <h2 className="text-xl mt-4">Total Price: ${totalPrice.toFixed(2)}</h2>
      {token && !cart.length && <p>No Items In Cart</p>}
      {cart.length && (
        <button
          onClick={checkout}
          className="hover:bg-blue hover:text-white bg-transparent border rounded-md px-3 py-1 transition duration-300 ease-in-out"
        >
          Checkout
        </button>
      )}
      {!token && !session.cart && <p>No items</p>}
    </>
  );
};
export default Cart;
