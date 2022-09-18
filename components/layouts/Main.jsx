import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
const Main = ({ children }) => {
  return (
    <div className="font-normal">
      <Navbar />
      <ToastContainer autoClose={20000} />
      {children}
      <Footer />
    </div>
  );
};

export default Main;
