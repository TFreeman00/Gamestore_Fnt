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
    for (let x of order[i].productInfo) {
      totalPrice += x.productDescription.price;
    }
    newOrder.push({
      totalPrice,
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
            <h2 className="text-2xl font-bold mb-4">Account Details</h2>
            <hr className="my-4" />
            <div className="mb-4">
              <h4 className="text-lg">Id: {users.id}</h4>
              <h4 className="text-lg">First Name: {users.firstname}</h4>
              <h4 className="text-lg">Last Name: {users.lastname}</h4>
              <h4 className="text-lg">Email: {users.email}</h4>
            </div>
            <button
              className="text-black hover:bg-blue hover:text-white bg-transparent border rounded-md px-3 py-1 transition duration-300 ease-in-out"
              onClick={onEdit}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <hr className="my-8" />
      <div>
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        <div>
          {newOrder.map((order, index) => {
            return (
              <div key={index} className="mb-8">
                <div className="mb-2">Order Number: {order.id}</div>
                <div className="mb-2">
                  Order Placed:{" "}
                  {order.createdat.slice(0, order.createdat.search("T"))}
                </div>
                <div className="mb-2">Total Price: ${order.totalPrice}</div>
                {order.productInfo.map((product, index) => (
                  <div key={index} className="mb-2">
                    {product.productDescription.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
