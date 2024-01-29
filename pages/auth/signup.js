import React, { useState } from "react";
import FormInput from "../../components/auth/FormInput";
import Main from "../../components/layouts/Main";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authReady, setauthReady] = useState(true);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setauthReady(false);
    const doc = {
      _type: "user",
      name: name,
      email: email,
      password: password,
    };
    console.log("Console se :", process.env.HOST);
    // const result = await axios.post("http://localhost:3000/api/signup", doc);
    const result = await axios.post(`${process.env.HOST}/api/signup`, doc);

    // const result = await axios.post("api/signup", doc);

    console.log(result);
    toast(`${result.data}`);
    setName("");
    setEmail("");
    setPassword("");
    setauthReady(true);
  };
  return (
    <Main>
      <section className="flex justify-center pt-20 min-h-screen">
        <div className="w-10/12 md:w-7/12 lg:w-4/12">
          <h2 className="text-xl md:text-2xl font-medium py-3 border-b pl-5">
            Sign Up and Start Learning!
          </h2>

          <form onSubmit={handleSignUp} className="w-full py-4">
            <FormInput
              inputVal={name}
              setInput={setName}
              type="text"
              iconName={<BsFillPersonFill />}
              placeholder="Full Name"
              name="full_name"
            />
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
              action={!authReady ? "Sign Up" : "Please wait ..."}
            /> */}
            <button
              type="submit"
              disabled={!authReady}
              className="block w-full bg-red-500 my-4 py-3 text-gray-50 rounded font-semibold"
            >
              {authReady ? "SignUp" : "Please wait..."}
            </button>

            <p className="text-center text-xs inline-block pb-4 border-b w-full">
              By signing up, you agree to our Terms of Use and Privacy Policy.
            </p>

            <p className="md:text-lg my-2 text-center ">
              Already have an account?{" "}
              <span className="text-blue-600 font-medium">
                <Link href="/auth/login">Log In</Link>
              </span>
            </p>
          </form>
        </div>
      </section>
    </Main>
  );
};

export default Signup;
