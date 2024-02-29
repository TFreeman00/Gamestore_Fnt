import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      &copy; Video Game Store {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
