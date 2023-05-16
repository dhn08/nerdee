import React, { useState } from "react";
import { useRouter } from "next/router";
import Main from "../../components/layouts/Main";
import { MdTitle } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import FormInput from "../../components/auth/FormInput";
import FormTextArea from "../../components/auth/FormTextArea";
import Link from "next/link";
const addCourse = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleAddCourse = async (e) => {
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
            Add course
          </h2>

          <form onSubmit={handleAddCourse} className="w-full py-4">
            <FormInput
              inputVal={title}
              setInput={setTitle}
              type="text"
              iconName={<MdTitle />}
              placeholder="Title"
              name="title"
            />
            <FormTextArea
              inputVal={description}
              setInput={setDescription}
              iconName={<CgDetailsMore />}
              placeholder="Description"
              name="Description"
            />

            {/* <AuthBtn
                disabled={authReady}
                action={!authReady ? "Log In" : "Please wait..."}
              /> */}
            <button
              type="submit"
              className="block w-full bg-red-500 my-4 py-3 text-gray-50 rounded font-semibold"
            >
              Submit
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

export default addCourse;
