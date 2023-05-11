import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
const Main = ({ children }) => {
  return (
    <div className="font-normal">
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {children}
      <Footer />
    </div>
  );
};

export default Main;
