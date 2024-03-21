import React from "react";
import { useNavigate } from "react-router-dom";
const Terms = () => {
  const navigate = useNavigate();
  const backToHome = async () => {
    navigate("/");
  };
  return (
    <div className="mt-7 flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
      <p>
        Terms and Conditions: Welcome to VG Store. This Website is owned and
        operated by the Party of FOUR. Throughout the Website, the terms "we,"
        "us," and "our" refer to VG Store. By accessing and using this Website,
        you agree to comply with and be bound by the following terms and
        conditions of use. Please read these terms and conditions carefully
        before using our Website.
      </p>
      <ul className="text-xl font-bold mt-8 mb-4"> Acceptance of Terms</ul>
      <p className="text-left">
        {" "}
        By accessing or using this Website in any manner, including, but not
        limited to, visiting or browsing the Website, you agree to be bound by
        these Terms and Conditions, as well as all applicable laws and
        regulations, and agree that you are responsible for compliance with any
        applicable local laws.
      </p>
      <button
        onClick={backToHome}
        className="mt-8 mb-4 bg-indigo-600 text-black py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Back to Home
      </button>
    </div>
  );
};
export default Terms;
