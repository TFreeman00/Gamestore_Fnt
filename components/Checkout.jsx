import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../api/ordersApi";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { cart } = useSelector((state) => state.cartSlice);
  const { token } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  let subtotal = 0;
  let taxes = 0;
  let total = 0;
  cart.forEach((item) => {
    subtotal += Number(item?.products?.price);
    taxes = Number(subtotal * 0.07).toFixed(2);
    total = Number(subtotal) + Number(taxes);
  });
  const handlePay = async (e) => {
    e.preventDefault();
    navigate("/confirmation");
    if (token) {
      await createOrder({ token });
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url('https://www.gameopedia.com/wp-content/uploads/2022/05/fC-1170x725.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <main className="bg-white mt-3 mx-auto p-8 justify-center">
        <div className="flex items-center justify-center h-full">
          <h1 className="mt-8 mb-4 text-3xl lg:text-2xl font-bold text-center">
            Check out
          </h1>
        </div>
        <section
          aria-labelledby="order-heading"
          className="mt-4 bg-gray-50 px-4 py-6 sm:px-6 mx-auto lg:hidden"
        >
          <Disclosure as="div" className="mx-auto max-w-lg">
            {({ open }) => (
              <>
                <div className="flex items-center justify-between">
                  <h2
                    id="order-heading"
                    className="mb-8 text-2xl text-gray-900"
                  >
                    Your Order
                  </h2>
                  <Disclosure.Button className="mb-8 text-lg  py-3 text-indigo-600 hover:text-indigo-500">
                    {open ? (
                      <span className="relative ml-8 bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-6 py-3 transition duration-300 ease-in-out">
                        Hide full summary
                      </span>
                    ) : (
                      <span className="relative ml-8 bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-6 py-3 transition duration-300 ease-in-out">
                        Show full summary
                      </span>
                    )}
                  </Disclosure.Button>
                </div>
                <Disclosure.Panel>
                  <ul
                    role="list"
                    className="mb-8 divide-y divide-gray-200 border-b border-gray-200"
                  >
                    {cart.map((item, idx) => (
                      <li key={idx} className="mb-8 flex space-x-6 py-6">
                        <img
                          src={item?.products?.image}
                          alt={item?.products?.title}
                          className="h-40 w-4 mt-4 flex rounded-md bg-gray-200 object-cover object-center"
                        />
                        <div className="flex flex-col justify-between space-y-4 ">
                          <div className="space-y-1 font-medium">
                            <h3 className="text-gray-900">
                              {item?.products?.title}
                            </h3>
                            <p className="text-gray-900">
                              ${item?.products?.price}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-10 space-y-6  font-medium text-gray-500">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd className="text-l lg:text-2xl font-bold text-center">
                        ${subtotal.toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Taxes</dt>
                      <dd className="text-l lg:text-2xl font-bold text-centertext-gray-900">
                        ${taxes}
                      </dd>
                    </div>
                  </dl>
                </Disclosure.Panel>
                <p className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
                  <span className="text-base">Total</span>
                  <span className="text-xl lg:text-2xl font-bold text-center">
                    ${total.toFixed(2)}
                  </span>
                </p>
              </>
            )}
          </Disclosure>
        </section>
        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex"
        >
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>
          <ul
            role="list"
            className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6"
          >
            {cart.map((item) => (
              <li key={item.id} className=" flex space-x-6 py-6">
                <img
                  src={item?.products?.image}
                  alt={item?.products?.title}
                  className=""
                />
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-1 text-lg font-medium">
                    <h3 className="text-gray-900">{item?.products?.title}</h3>
                    <p className="text-gray-900">{item?.products?.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
            <dl className="space-y-6 text-md font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">{subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">{taxes}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-lg">Total</dt>
                <dd className="text-base">{total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </section>
        <section
          aria-labelledby="payment-heading"
          className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
        >
          <div className="mx-auto max-w-lg">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-black py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <span className="sr-only">Buy with</span>
              <svg
                className="h-5 w-auto"
                fill="currentColor"
                viewBox="0 0 50 20"
              >
                <path d="M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z" />
              </svg>
            </button>
            <div className="relative mt-8">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-lg font-medium text-gray-500">
                  or
                </span>
              </div>
            </div>
            <form className="mt-6">
              <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                <div className="col-span-full">
                  <label
                    htmlFor="email-address"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                      title="Please enter a valid email address"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="name-on-card"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                      title="Please enter your full name"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="card-number"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                      minLength="16"
                      maxLength="16"
                      pattern="[0-9]{16}"
                      title="Please enter a 16-digit card number"
                    />
                  </div>
                </div>
                <div className="col-span-8 sm:col-span-9">
                  <label
                    htmlFor="expiration-date"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Expiration date
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-x-4">
                    <select
                      id="expiration-month"
                      name="expirationMonth"
                      className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">Month</option>
                      {/* Add options for each month */}
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, "0");
                        return (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      id="expiration-year"
                      name="expirationYear"
                      className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm gap-2"
                      required
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <option key={year} value={year}>
                            {year.toString().slice(-2)}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="cvc"
                    className="block text-lg font-medium text-gray-900"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      minLength="3"
                      maxLength="4"
                      required
                      pattern="[0-9]{3,4}"
                      title="Please enter a 3 or 4-digit CVC"
                    />
                  </div>
                </div>
                <div className="col-span-full sm:col-span-4">
                  <label
                    htmlFor="postal-code"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Billing Zip code
                  </label>
                  <div className="flex mt-1 justify-center">
                    <input
                      type="number"
                      id="postal-code"
                      name="postal"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      minLength="5"
                      maxLength="5"
                      required
                      pattern="[0-9]{5}"
                      title="Please enter a 5-digit postal code"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-3 items-center justify-center h-full">
                <button
                  type="submit"
                  className="relative ml-8 bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-6 py-3 transition duration-300 ease-in-out"
                >
                  Pay ${total.toFixed(2)}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};
export default Checkout;
