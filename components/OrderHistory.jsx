import React from "react";
import { useGetOrdersCustomerQuery } from "../api/ordersApi";
import { useSelector } from "react-redux";

export default function OrderHistory() {
  const { token } = useSelector((state) => state.authSlice);
  //Fething Orders data from API using "useGetOrdersCustomerQuery" hook
  //passing "token" as parameter
  const customer = useGetOrdersCustomerQuery({ token });
  const { order } = useSelector((state) => state.orderSlice);

  //For Loop to iterate through an Array of orders
  //and calulates the total price , then creates a new Array with the updates
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

  return (
    <>
      <h1 className="margintop">Order History</h1>
      <hr />
      <div>
        {/* Fancy way of telling the code to "go through each order 
      in the newOrder list, one by one." */}
        {newOrder.map((order, index) => {
          //"Order" represents current order in the loop
          //"index" keeps track of the orders positon in the list (Ex, 1st, 2nd, etc)

          return (
            <div key={index}>
              {/* displays the order Number*/}
              <div>Order Number: {order.id}</div>
              <div>
                {/* Curly braces tells react to insert actual order number  */}
                Order Placed: {/*Displays the date the order was placed */}
                {/* "T" is a seperator between Date and Time */}
                {order.createdat.slice(0, order.createdat.search("T"))}
                <div>Total Price: {order.totalPrice}</div>
              </div>
              {order.productInfo.map((product) => {
                return (
                  <>
                    <div>{product.productDescription.title}</div>
                    {/* <img src={product.productDescription.url} alt={product.productDescription.name} /> */}
                    <div>{product.productDescription.price}</div>
                  </>
                );
              })}
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
