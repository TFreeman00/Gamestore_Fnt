import React from "react";
import { useNavigate } from "react-router-dom";


const Policy = () => {
  const navigate = useNavigate();
  const backToHome = async () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mt-8 mb-4 text-3xl font-bold">
        VG Store Privacy Policy: Updated: March 21, 2024.
      </h1>
      <p className="mt-8 mb-4 text-2xl font-regular text-center">
        We know that you care how information about you is used and shared, and
        we appreciate your trust that we will do so carefully and sensibly. VG
        Store and its affiliates do NOT share your personal information to third
        parties. We collect your personal information in order to provide and
        continually improve our products and services. By using VG Store
        Services, you are consenting to the practices described in this Privacy
        Notice.
      </p>
      <button
        onClick={backToHome}
        className="mt-8 mb-4 bg-indigo-600 text-black py-2 px-4 rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 "
      >
        Back to Home
      </button>
    </div>
  );
};
export default Policy;
