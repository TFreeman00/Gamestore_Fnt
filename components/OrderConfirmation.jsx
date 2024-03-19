import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function OrderConfirmation() {
  const { token } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const backToHome = async () => {
    navigate("/");
  };
  return (
    <div>
      <h1>Thank you for shopping with us!</h1>
      <button onClick={backToHome}>Back to Home</button>
    </div>
  );
}
