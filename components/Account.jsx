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
    <>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        {users && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Account Details </h2>
            <hr className="my-4" />
            <h4 className="text-lg">Id: {users.id}</h4>
            <h4 className="text-lg">First Name: {users.firstname}</h4>
            <h4 className="text-lg">Last Name: {users.lastname}</h4>
            <h4 className="text-lg">Email: {users.email}</h4>
            <h4 className="text-lg">Password: {users.password}</h4>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
              onClick={onEdit}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <hr />
      <div>
        <h2>Order History:</h2>
        <div>
          {newOrder.map((order, index) => {
            return (
              <div key={index}>
                <div>Order Number: {order.id}</div>
                <div>
                  Order Placed:{" "}
                  {order.createdat.slice(0, order.createdat.search("T"))}
                  <div>Total Price: ${order.totalPrice}</div>
                </div>
                {order.productInfo.map((product) => {
                  return (
                    <>
                      <div>{product.productDescription.name}</div>
                    </>
                  );
                })}
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
