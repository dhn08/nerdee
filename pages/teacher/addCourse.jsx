import React, { useState } from "react";
import { useRouter } from "next/router";
import Main from "../../components/layouts/Main";
import { MdTitle } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { IoPricetagOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import FormInput from "../../components/auth/FormInput";
import FormTextArea from "../../components/auth/FormTextArea";

import { allSectorsNameQuery } from "../../utils/queries";
import FormSelection from "../../components/auth/FormSelection";
import client from "../../utils/client";
import ImageInput from "../../components/auth/ImageInput";
import { toast } from "react-toastify";
import axios from "axios";
const addCourse = ({ sectors }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [author, setauthor] = useState("");
  const [selectedOption, setselectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setuploading] = useState(false);
  const handleAddCourse = async (e) => {
    e.preventDefault();
    setuploading(true);
    if (!selectedImage) {
      toast("Please select image");
      setuploading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("selectedOption", selectedOption);
    formData.append("author", author);

    try {
      const { data } = await axios.post("/api/teacher/addCourse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data) {
        setuploading(false);
        toast(data.msg);
        console.log(data);
        setTitle("");
        setauthor("");
        setDescription("");
        setPrice("");
        setselectedOption("");
        setSelectedImage(null);
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
    <Main>
      <section className="flex justify-center pt-20 min-h-screen">
        <div className="w-10/12 md:w-7/12 lg:w-4/12">
          <h2 className="text-xl md:text-2xl font-medium py-3 border-b pl-5">
            Add course
          </h2>

          <form onSubmit={handleAddCourse} className="w-full py-4 space-y-6">
            <FormInput
              inputVal={title}
              setInput={setTitle}
              type="text"
              iconName={<MdTitle />}
              placeholder="Title"
              name="title"
            />
            <FormInput
              inputVal={author}
              setInput={setauthor}
              type="text"
              iconName={<AiOutlineUser />}
              placeholder="Author"
              name="author"
            />
            <FormTextArea
              inputVal={description}
              setInput={setDescription}
              iconName={<CgDetailsMore />}
              placeholder="Description"
              name="Description"
            />
            <FormInput
              inputVal={price}
              setInput={setPrice}
              type="number"
              iconName={<IoPricetagOutline />}
              placeholder="Price"
              name="price"
            />
            <FormSelection
              inputVal={selectedOption}
              setInput={setselectedOption}
              sectors={sectors}
              iconName={<BiCategory />}
            />

            <ImageInput
              iconName={<BsImageFill />}
              inputVal={selectedImage}
              setInput={setSelectedImage}
              name="image"
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
              {!uploading ? "Add Course" : "Please Wait ..."}
            </button>
          </form>
        </div>
      </section>
    </Main>
  );
};

export default addCourse;

export async function getServerSideProps(context) {
  const q1 = allSectorsNameQuery();
  const sectors = await client.fetch(q1);

  return {
    props: { sectors }, // will be passed to the page component as props
  };
}
