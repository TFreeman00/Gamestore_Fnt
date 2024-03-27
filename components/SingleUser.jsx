import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../api/usersApi";
import { useGetOrdersAdminMutation } from "../api/ordersApi";
import { useEffect } from "react";
export default function SingleUser() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.authSlice);
  const users = useGetUserQuery({ id, token });
  const user = useSelector((state) => state.usersSlice);
  const [orders] = useGetOrdersAdminMutation();
  useEffect(() => {
    const loadOrders = () => {
      orders({ id: Number(id), token });
    };
    if (token) loadOrders();
  }, []);
  const order = useSelector((state) => state.orderSlice);
  let newOrder = [];
  for (let i = 0; i < order.order.length; i++) {
    let totalPrice = 0;
    for (let x of order.order[i].productInfo) {
      totalPrice += x.productDescription.price;
    }
    newOrder.push({
      totalPrice,
      ...order.order[i],
    });
  }
  return (
    <div
      style={{
        backgroundImage: `url('https://i.pinimg.com/originals/42/b9/01/42b901d96c8588f3aa95f1492a3648ae.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="max-w-xl mt-4 mx-auto py-8" style={{ opacity: 0.9 }}>
        <div className="max-w-md mx-auto mt-4 bg-white rounded-lg p-6">
          <h2 className=" text-3xl text-center font-semibold ">User Details</h2>
          <h4 className="mb-2">ID: {user?.user?.id}</h4>
          <p className="mb-2">First Name: {user?.user?.firstname}</p>
          <p className="mb-2">Last Name: {user?.user?.lastname}</p>
          <p className="mb-2">Email: {user?.user?.email}</p>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 gap-4">
            {newOrder.length &&
              newOrder.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md ml-4 mt-4 rounded-lg p-6"
                >
                  <h2 className="text-xl  font-semibold ml-4">Order History</h2>
                  <h4 className="mb-2">Order Number: {item.id}</h4>
                  <div className="mb-2">
                    Total Price: ${item.totalPrice.toFixed(2)}
                  </div>
                  <p className="mb-2">
                    {item.createdat.slice(0, item.createdat.search("T"))}
                  </p>
                  {item.productInfo.map((itm, idx) => (
                    <div key={itm.id} className="flex items-center">
                      <h4 className="mr-2">{itm.productDescription.name}</h4>
                      <img
                        className="w-12 h-12 object-cover"
                        src={itm.productDescription.url}
                        alt={itm.productDescription.name}
                      />
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
