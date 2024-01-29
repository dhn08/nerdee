import React, { useState } from "react";
import { useRouter } from "next/router";
// import Main from "../../components/layouts/Main";
import { MdTitle } from "react-icons/md";
import { ImListNumbered } from "react-icons/im";
import FormInput from "../../../components/auth/FormInput";
import { toast } from "react-toastify";
import axios from "axios";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import MainTeacher from "../../../components/layouts/MainTeacher";
const Id = () => {
  const router = useRouter();
  const courseId = router.query.Id;

  const [title, setTitle] = useState("");
  const [sectionNumber, setsectionNumber] = useState("");
  const [uploading, setuploading] = useState(false);
  const handleAddSection = async (e) => {
    e.preventDefault();
    setuploading(true);
    // const formData = new FormData();
    // formData.append("file", selectedImage);
    // formData.append("title", title);
    // formData.append("description", description);
    // formData.append("price", price);
    // formData.append("selectedOption", selectedOption);
    // formData.append("author", author);

    try {
      const { data } = await axios.post("/api/teacher/addSection", {
        title,
        sectionNumber,
        courseId,
      });

      if (data) {
        setuploading(false);
        toast(data.msg);
        console.log(data);
        setTitle("");
        setsectionNumber("");
      }
    } catch (error) {
      toast(error.message);
    }
    // if (!status.ok) {
    //   toast(status.error);
    // }
    // if (status.ok) {
    //   router.push(status.url);
    // }
  };

  return (
    <MainTeacher>
      <section className="flex justify-center pt-20 min-h-screen">
        <div className="w-10/12 md:w-7/12 lg:w-4/12">
          <h2 className="text-xl md:text-2xl font-medium py-3 border-b pl-5">
            Add Section
          </h2>

          <form onSubmit={handleAddSection} className="w-full py-4 space-y-6">
            <FormInput
              inputVal={title}
              setInput={setTitle}
              type="text"
              iconName={<MdTitle />}
              placeholder="Section Title"
              name="title"
            />
            {/* <FormInput
              inputVal={author}
              setInput={setauthor}
              type="text"
              iconName={<AiOutlineUser />}
              placeholder="Author"
              name="author"
            /> */}

            <FormInput
              inputVal={sectionNumber}
              setInput={setsectionNumber}
              type="number"
              iconName={<ImListNumbered />}
              placeholder="Section Number"
              name="section number"
            />
            {/* <AuthBtn
                disabled={authReady}
                action={!authReady ? "Log In" : "Please wait..."}
              /> */}
            <button
              disabled={uploading}
              type="submit"
              className="block w-full bg-red-500 my-4 py-3 text-gray-50 rounded font-semibold"
            >
              {!uploading ? "Add Section" : "Please Wait ..."}
            </button>
          </form>
        </div>
      </section>
    </MainTeacher>
  );
};

export default Id;

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: `${process.env.HOST}/auth/login`,
        permanent: false,
      },
    };
  }
  if (session.user.role !== "Teacher") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
