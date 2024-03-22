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

  cart.forEach((item) => {
    totalPrice += Number(item.products.price);
  });

  useEffect(() => {
    const setCart = () => {
      const data = {
        cart: JSON.parse(window.sessionStorage.cart),
      };
      setSession(data);
    };
  }, []);

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
      <main>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <hr className="my-4" />

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {cart.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="bg-gray-100 p-4 rounded-md space-y-2"
                >
                  <div className="text-lg font-semibold">
                    {cartItem.products.title}
                  </div>
                  <img
                    className="h-40 w-40"
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
                    Remove
                  </button>
                </div>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${totalPrice.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${(totalPrice * 0.07).toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${(totalPrice * 1.07).toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              {cart.length ? (
                <button
                  onClick={checkout}
                  className="w-64 rounded-md  hover:bg-blue border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              ) : null}
            </div>
          </section>
          {token && !cart.length && <p>No Items In Cart</p>}
        </form>
      </main>
    </>
  );
};
export default Cart;
