import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetOrdersCustomerQuery } from "../api/ordersApi";

export default function Account() {
  const { users, token } = useSelector((state) => state.authSlice);
  const customer = useGetOrdersCustomerQuery({ token });
  const { order } = useSelector((state) => state.orderSlice);
  const navigate = useNavigate();

  let newOrder = [];
  for (let i = 0; i < order.length; i++) {
    let totalPrice = 0;
    let total = 0;

    for (let x of order[i].productInfo) {
      totalPrice += x.productDescription.price;
      total = Number(totalPrice * 1.07).toFixed(2);
    }
    newOrder.push({
      total,
      ...order[i],
    });
  }

  const onEdit = () => {
    navigate(`/users/me/${users.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
        {users && (
          <div>
            <h2 className="text-center text-2xl font-bold mb-4">
              Account Details
            </h2>
            <hr className="my-4" />
            <div className="mb-4">
              <h4 className="text-lg mb-2">Id: {users.id}</h4>
              <h4 className="text-lg mb-2">First Name: {users.firstname}</h4>
              <h4 className="text-lg mb-2">Last Name: {users.lastname}</h4>
              <h4 className="text-lg mb-2">Email: {users.email}</h4>
            </div>
            <div className="mt-4 flex flex-col items-center justify-center">
              <button
                className="relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 ease-in-out"
                onClick={onEdit}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
      <hr className="my-8" />
      <div>
        <h1 className="mt-4 flex flex-col items-center justify-center text-2xl font-bold mb-4">
          Order History
        </h1>
        <div className="mt-10 container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newOrder.map((order, index) => {
            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 mb-8 max-w-md w-full mx-4 md:mx-auto p-8"
              >
                <div className="mb-2 font-bold">Order Number: {order.id}</div>
                <div className="mb-2">
                  Order Placed:{" "}
                  {order.createdat.slice(0, order.createdat.search("T"))}
                </div>
                <div className="mb-2">Total Price: ${order.total}</div>
                <div className="flex flex-wrap">
                  {order.productInfo.map((product, index) => (
                    <div key={index} className="mb-2 flex flex-wrap mr-4">
                      <img
                        src={product.productDescription.image}
                        alt={product.productDescription.title}
                        className="h-40 w-4"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
