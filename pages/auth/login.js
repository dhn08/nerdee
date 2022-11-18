import { useState } from "react";
import React from "react";
import Main from "../../components/layouts/Main";
import FormInput from "../../components/auth/FormInput";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const status = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: "/",
    });
    console.log(status);
    if (!status.ok) {
      toast(status.error);
    }
    if (status.ok) {
      router.push(status.url);
    }
  };
  return (
    <Main>
      <section className="flex justify-center pt-20 min-h-screen">
        <div className="w-10/12 md:w-7/12 lg:w-4/12">
          <h2 className="text-xl md:text-2xl font-medium py-3 border-b pl-5">
            Log In and Start Learning!
          </h2>

          <form onSubmit={handleLogin} className="w-full py-4">
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
            <button
              type="submit"
              className="block w-full bg-red-500 my-4 py-3 text-gray-50 rounded font-semibold"
            >
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
