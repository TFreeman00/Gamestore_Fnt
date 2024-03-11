import React, { useEffect } from "react";
import { useDeleteCartMutation, useAddToCartMutation } from "../api/cartApi";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../api/ordersApi";
import { Link } from "react-router-dom";
import GameCard from "./GameCard";

export default function Cart() {
  const { token } = useSelector((state) => state.authSlice);
  const [deleteItem] = useDeleteCartMutation();
  const { cart } = useSelector((state) => state.cartSlice);
  const [createOrder] = useCreateOrderMutation();
  const [addToCart] = useAddToCartMutation();

  let totalPrice = 0;

  useEffect(() => {
    if (!token) {
      cart.forEach((x) => {
        totalPrice += Number(x.productDescription.price);
      });
    } else {
      cart.forEach((x) => {
        totalPrice += Number(x.productDescription.price);
      });
    }
  }, [token, cart]);

  const checkout = async () => {
    await createOrder({ token });
  };

  const remove = (id) => {
    deleteItem({
      id: Number(id),
      token,
    });
  };

  const addToCartHandler = (productId) => {
    addToCart({ productid: productId, token });
  };

  return (
    <div className="flex justify-center">
      <div className="container mx-auto p-20">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
          {cart.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white shadow-md p-4 rounded-md flex items-center space-x-4"
                  >
                    <img
                      src={item.productDescription.url}
                      alt={item.productDescription.name}
                      className="w-20 h-20 object-contain"
                    />
                    <div>
                      <h2 className="font-semibold">
                        {item.productDescription.name}
                      </h2>
                      <p className="text-gray-600">
                        ${item.productDescription.price}
                      </p>
                      <button
                        onClick={() => remove(item.productid)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Subtotal: ${totalPrice.toFixed(2)}
                </h2>
                <div>
                  <button
                    onClick={checkout}
                    className="bg-black text-white py-2 px-4 rounded-md mr-4 hover:bg-gray-900"
                  >
                    Checkout
                  </button>
                  <Link
                    to="/"
                    className="bg-gray-300 text-black-800 py-2 px-4 rounded-md hover:bg-gray-400"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <p className="text-xl">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}
