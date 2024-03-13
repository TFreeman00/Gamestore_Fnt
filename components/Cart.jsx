import React, { useEffect, useState } from "react";
import { useDeleteCartMutation, useGetCartQuery } from "../api/cartApi";
import { useSelector } from "react-redux";
// import "../src/index.css";
import { useCreateOrderMutation } from "../api/ordersApi";
const Cart = () => {
  const { token } = useSelector((state) => state.authSlice);
  const [deleteItem] = useDeleteCartMutation();
  const getCart = useGetCartQuery({ token }); // making api call
  const { cart } = useSelector((state) => state.cartSlice);
  const [createOrder] = useCreateOrderMutation();
  const [session, setSession] = useState({ cart: [] });
  let totalPrice = 0;
  let cartPrice = [];
  // useEffect hook to perform side effects in functional components.
  useEffect(() => {
    // getCart();
    const setCart = () => {
      const data = {
        cart: JSON.parse(window.sessionStorage.cart),
      };
      setSession(data);
    };
    //This checks if the User is logged in & if there's data stored in the session storage.
    //If true setCart function is called.
    if (!token && window.sessionStorage.cart) setCart();
  }, []);
  const checkout = async () => {
    await createOrder({ token });
  };
  console.log(cart);
  //calculates the total price of items in the cart
  //and defines a function to remove an item from the cart.
  if (!token) {
    cartPrice = session.cart;
    cartPrice.forEach((item) => {
      totalPrice += Number(item.price);
    });
    // If user NOT logged in, it calculates the total price from the cart.
  } else {
    cartPrice = cart;
    cartPrice.forEach((item) => {
      console.log(item);
      totalPrice += Number(item.products.price);
    });
  }
  //Deletes product from the session cart
  const remove = (id) => {
    console.log(id, token);
    deleteItem({
      productid: Number(id),
      token,
    });
  };
  return (
    //Viewing the Cart as a User
    <>
      <h1 className="margintop">Cart</h1>
      <hr />
      {/* mapping over the session Cart */}
      {(!token && session.cart.length && (
        <div className="cart">
          {session.cart.map((item, index) => {
            return (
              <div key={index}>
                <h3>
                  {item.title} - ${item.price}
                </h3>
                <img className="imgsize" src={item.url} alt={item.title} />
                <div>
                  <button
                    //removes items and returns an updated session cart
                    id={item.id}
                    onClick={(e) => {
                      if (session.cart.length === 1) {
                        window.sessionStorage.removeItem("cart");
                        setSession({ cart: [] });
                        return;
                      }
                      const cart = [];
                      console.log(cart, e.target.id);
                      let check = false;
                      for (let item of session.cart) {
                        if (item.id === e.target.id && !check) check = true;
                        else cart.push(item);
                      }
                      setSession({ cart });
                      window.sessionStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        // OR
      )) || (
        //Viewing the Cart as a LoggedIn User
        <div className="cart">
          {cart.map((cart) => {
            //  console.log(cart)
            return (
              <div key={cart.id}>
                <div>{cart.products.title}</div>
                <img
                  className="image"
                  src={cart.products.image}
                  alt={cart.products.title}
                />
                <div>{cart.products.price}</div>
                <button
                  id={cart.id}
                  onClick={(e) => {
                    // console.log( e.target);
                    remove(e.target.id);
                  }}
                >
                  Delete Item
                </button>
              </div>
            );
          })}
        </div>
      )}
      {/* displays the total price of the items in the cart */}
      <h2>Total Price: {totalPrice.toFixed(2)}</h2>
      {/* //If the user is logged in (token is truthy) and the cart is empty  */}
      {token && !cart.length && <>No Items In Cart</>}
      {/* If the user is logged in (token is truthy) and the cart has items */}
      {token && cart.length && <button onClick={checkout}>checkout</button>}
      {/* If the user is logged in (token is truthy) and the cart is empty  */}
      {!token && !session.cart && <>No items</>}
    </>
  );
};
export default Cart;
