import React from "react";
import { useNavigate } from "react-router-dom";
const ContactConfirmation = () => {
  const navigate = useNavigate();
  const backToHome = async () => {
    navigate("/");
  };
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
    >
      <h1 className="text-3xl font-bold mb-8">Thank you for your message!</h1>
      Someone will contact you shortly.
      <button
        onClick={backToHome}
        className="mt-8 mb-4 bg-indigo-600 text-black py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Back to Home
      </button>
    </div>
  );
};
export default ContactConfirmation;
