import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import CartContext from "../context/CartContext";
const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { data: session } = useSession();
  const router = useRouter();
  const [term, setTerm] = useState("");
  const pushRoute = (route) => {
    router.push(route);
  };
  const handleChange = (e) => {
    setTerm(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/search/" + term);
    setTerm("");
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
      <form
        onSubmit={handleSubmit}
        className="hidden md:flex items-center w-4/12 lg:w-5/12 bg-gray-50 border border-black rounded-full px-2 py-1 lg:py-2"
      >
        <div className="w-3/12 text-2xl flex items-center md:w-2/12 justify-center lg:justify-between">
          <BsSearch />
        </div>
        <input
          autoComplete="off"
          value={term}
          onChange={handleChange}
          type="text"
          placeholder="Search for a anything..."
          className="w-10/12 py-1 outline-none bg-transparent "
        />
      </form>
      <div className="w-3/12 flex items-center md:w-2/12 justify-center lg:justify-between">
        <Link className="hidden lg:block" href="/auth/signupTeacher">
          Teach on Nerdee
        </Link>

        <Link href="/cart">
          <div className="flex items-center relative">
            <div
              className={
                "absolute h-4 w-4 bg-red-400 rounded-full -top-2 -right-1 " +
                `${!cart.length ? "hidden" : ""}`
              }
            ></div>
            <a href="" className="flex items-center justify-center text-2xl">
              <AiOutlineShoppingCart />
            </a>
          </div>
        </Link>
      </div>
      <div className="w-5/12 md:w-4/12 lg:w-2/12 flex justify-between items-center ">
        {/* <button
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
        </button> */}
        {!session?.user ? (
          <>
            {" "}
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
          </>
        ) : (
          <>
            {" "}
            <Link href="/user">
              <p className="text-blue-500 cursor-pointer ">
                {session.user.name}
              </p>
            </Link>
            <button
              onClick={() => signOut()}
              className="text-sm py-1 px-2 lg:text-base  lg:py-2 rounded-md md:px-5 border bg-red-400 font-semibold text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
