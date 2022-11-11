import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Navbar = () => {
  const router = useRouter();
  const pushRoute = (route) => {
    router.push(route);
  };
  return (
    <nav className="flex h-20 items-center bg-white justify-between shadow-2xl text-gray-900 py-4 md:py-2 px-6">
      <div className="w-3/12 md:w-2/12 lg:w-1/12  flex items-center justify-center mr-4">
        <Link href="/">
          <img
            src="https://res.cloudinary.com/dplljbrim/image/upload/v1663413909/neerdee/nerdee-logos_transparent_dbepjx.png"
            className="w-full cursor-pointer"
          />
        </Link>
      </div>
      <form className="hidden md:flex items-center w-4/12 lg:w-5/12 bg-gray-50 border border-black rounded-full px-2 py-1 lg:py-2">
        <div className="w-3/12 text-2xl flex items-center md:w-2/12 justify-center lg:justify-between">
          <BsSearch />
        </div>
        <input
          type="text"
          placeholder="Search for a anything..."
          className="w-10/12 py-1 outline-none bg-transparent "
        />
      </form>
      <div className="w-3/12 flex items-center md:w-2/12 justify-center lg:justify-between">
        <Link className="hidden lg:block" href="/auth/signupTeacher">
          Teach on Nerdee
        </Link>

        <Link href="/">
          <div className="flex items-center relative">
            <a href="" className="flex items-center justify-center text-2xl">
              <AiOutlineShoppingCart />
            </a>
          </div>
        </Link>
      </div>
      <div className="w-5/12 md:w-4/12 lg:w-2/12 flex justify-between items-center ">
        <button
          onClick={() => pushRoute("/auth/login")}
          className="text-sm py-1 px-2 lg:text-base  lg:py-2 rounded-md md:px-5 border border-blue-500 font-semibold text-blue-500  bg-white "
        >
          Log In
        </button>
        <button
          onClick={() => pushRoute("/auth/signup")}
          className="text-sm py-1 px-2 lg:text-base  lg:py-2 rounded-md md:px-5 border bg-blue-500 font-semibold text-white"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
