import { useState } from "react";
import React from "react";
import Main from "../../components/layouts/Main";
import FormInput from "../../components/auth/FormInput";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Main>
      <section className="flex justify-center pt-20 min-h-screen">
        <div className="w-10/12 md:w-7/12 lg:w-4/12">
          <h2 className="text-xl md:text-2xl font-medium py-3 border-b pl-5">
            Log In and Start Learning!
          </h2>

          <form action="" className="w-full py-4">
            <FormInput
              inputVal={email}
              setInput={setEmail}
              type="email"
              iconName={<MdEmail />}
              placeholder="Email"
              name="email"
            />
            <FormInput
              inputVal={password}
              setInput={setPassword}
              type="password"
              iconName={<RiLockPasswordFill />}
              placeholder="Password"
              name="password"
            />

            {/* <AuthBtn
              disabled={authReady}
              action={!authReady ? "Log In" : "Please wait..."}
            /> */}
            <button className="block w-full bg-red-500 my-4 py-3 text-gray-50 rounded font-semibold">
              Log in
            </button>

            <p className="md:text-lg my-2 text-center ">
              Do not have an account?{" "}
              <span className="text-blue-600 font-medium">
                <Link href="/auth/signup">Sign Up</Link>
              </span>
            </p>
          </form>
        </div>
      </section>
    </Main>
  );
};

export default login;
