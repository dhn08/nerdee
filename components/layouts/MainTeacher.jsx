import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer";
import NavbarTeacher from "../NavbarTeacher";
const MainTeacher = ({ children }) => {
  return (
    <div className="font-normal">
      <NavbarTeacher />
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

export default MainTeacher;
