import React, { useEffect, useState } from "react";
import { useDeleteCartMutation, useGetCartQuery } from "../api/cartApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { token } = useSelector((state) => state.authSlice);
  const [deleteItem] = useDeleteCartMutation();
  const getCart = useGetCartQuery({ token }); // making api call
  const { cart } = useSelector((state) => state.cartSlice);
  const navigate = useNavigate();
  const [session, setSession] = useState({ cart: [] });
  let totalPrice = 0;

  useEffect(() => {
    const setCart = () => {
      const data = {
        cart: JSON.parse(window.sessionStorage.cart),
      };
      setSession(data);
    };
    if (!token && window.sessionStorage.cart) setCart();
  }, [token]);

  const cartItems = token ? cart : session.cart;

  cartItems.forEach((item) => {
    totalPrice += Number(item.products?.price || item.price);
  });

  const checkout = async () => {
    navigate("/checkout");
  };

  const remove = (id) => {
    deleteItem({
      productid: Number(id),
      token,
    });
  };

  const handleRemoveFromSessionCart = (id) => {
    const updatedCart = session.cart.filter((item) => item.id !== id);
    setSession({ cart: updatedCart });
    window.sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <h1 className="margintop text-2xl font-semibold">Cart</h1>
      <hr className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-gray-100 p-4 rounded-md space-y-2">
            <h3 className="text-lg font-semibold">
              {item?.title || item?.products?.title} - $
              {item?.price || item?.products?.price}
            </h3>
            <img
              className="hw-40 object-cover"
              src={item?.url || item?.products?.image}
              alt={item?.title || item?.products?.title}
            />
            <button
              onClick={() => {
                if (!token) {
                  handleRemoveFromSessionCart(item.id);
                } else {
                  remove(item.id || item.productid);
                }
              }}
              className="text-black hover:bg-blue hover:text-white bg-transparent border rounded-md px-3 py-1 transition duration-300 ease-in-out"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-xl mt-4">Total Price: ${totalPrice.toFixed(2)}</h2>
      {token && !cart.length && <p>No Items In Cart</p>}
      {token && cart.length > 0 && (
        <button
          onClick={checkout}
          className="hover:bg-blue hover:text-black bg-transparent border rounded-md px-3 py-1 transition duration-300 ease-in-out"
        >
          Checkout
        </button>
      )}
    </>
  );
};

export default Cart;
