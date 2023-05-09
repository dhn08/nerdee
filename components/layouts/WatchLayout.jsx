import Link from "next/link";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer";
const WatchLayout = ({ children, title }) => {
  return (
    <div className="font-primary">
      <nav className="flex items-center shadow-2xl text-white bg-gray-900 py-3 px-6">
        <div className="w-3/12 md:w-1/12 flex items-center   justify-center mr-4">
          <Link href="/">
            <img
              src="https://res.cloudinary.com/dplljbrim/image/upload/v1663413909/neerdee/nerdee-logos_white_g9vrdn.png"
              className="w-full cursor-pointer"
              alt="logo"
            />
          </Link>
        </div>
        <div className="overflow-hidden">| {title}</div>
      </nav>

      <ToastContainer autoClose={1500} />

      {children}

      <Footer />
    </div>
  );
};

export default WatchLayout;
