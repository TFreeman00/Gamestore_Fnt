import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-black text-center p-4">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; Video Game Store {new Date().getFullYear()}
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link to="/terms" className="hover:text-gray-400">
            Terms of Service
          </Link>
          <Link to="/policy" className="hover:text-gray-400">
            Privacy Policy
          </Link>
          <Link to="/contactForm" className="hover:text-gray-400">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
