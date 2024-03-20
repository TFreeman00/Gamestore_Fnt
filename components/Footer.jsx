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
          <a href="#" className="hover:text-gray-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <Link to="/ContactForm" className="hover:text-gray-400">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
