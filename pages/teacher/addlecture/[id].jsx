import { useRouter } from "next/router";
import React, { useState } from "react";
import MainTeacher from "../../../components/layouts/MainTeacher";
import FormInput from "../../../components/auth/FormInput";
import FormSelection from "../../../components/auth/FormSelection";
import { courseSectionsDetailQuery } from "../../../utils/queries";
import { MdTitle } from "react-icons/md";
import { ImListNumbered } from "react-icons/im";
import { RiVideoAddFill } from "react-icons/ri";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import client from "../../../utils/client";
import Link from "next/link";
import VideoInput from "../../../components/auth/VideoInput";
import { toast } from "react-toastify";
import axios from "axios";
const Id = ({ course_sections }) => {
  const router = useRouter();
  const courseId = router.query.id;
  const [title, setTitle] = useState("");
  const [selectedOption, setselectedOption] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploading, setuploading] = useState(false);
  const [progress, setProgress] = useState(0);
  //   console.log("vedio", selectedVideo);

  //   console.log("title:", title);
  //   console.log("selected:", selectedOption);

  const getVideoDuration = (videoFile) => {
    return new Promise((resolve, reject) => {
      const videoPlayer = document.createElement("video");
      videoPlayer.src = URL.createObjectURL(videoFile);

      videoPlayer.onloadedmetadata = () => {
        const duration = videoPlayer.duration;
        resolve(duration);
        URL.revokeObjectURL(videoPlayer.src);
      };

      videoPlayer.onerror = (error) => {
        reject(error);
        URL.revokeObjectURL(videoPlayer.src);
      };
    });
  };
  const handleAddLecture = async (e) => {
    e.preventDefault();
    setuploading(true);
    if (!selectedVideo) {
      toast("Please select video");
      setuploading(false);
      return;
    }

    // try {
    //   const vedioData = await client.assets.upload("file", selectedVideo);
    //   console.log(vedioData);
    // } catch (error) {
    //   console.log(error);

    // }
    const vedioData = await client.assets.upload("file", selectedVideo);

    const videoDuration = await getVideoDuration(selectedVideo);

    try {
      const { data } = await axios.post("/api/teacher/addLecture", {
        selectedOption,
        vedioData,
        title,
        videoDuration,
      });

      if (data) {
        setuploading(false);
        toast(data.msg);
        console.log(data);
        setTitle("");
        setselectedOption("");
        setSelectedVideo(null);
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
            Add Lecture
          </h2>
          {course_sections ? (
            <>
              <form
                onSubmit={handleAddLecture}
                className="w-full py-4 space-y-6"
              >
                <FormInput
                  inputVal={title}
                  setInput={setTitle}
                  type="text"
                  iconName={<MdTitle />}
                  placeholder="Title"
                  name="title"
                />

                <FormSelection
                  inputVal={selectedOption}
                  setInput={setselectedOption}
                  sectors={course_sections}
                  iconName={<ImListNumbered />}
                  name="Select section"
                />

                <VideoInput
                  iconName={<RiVideoAddFill />}
                  inputVal={selectedVideo}
                  setInput={setSelectedVideo}
                  name="video"
                />
                {progress > 0 && <progress value={progress} max="100" />}
                <button
                  disabled={uploading}
                  type="submit"
                  className="block w-full bg-red-500 my-4 py-3 text-gray-50 rounded font-semibold"
                >
                  {!uploading ? "Add Lecture" : "Please Wait ..."}
                </button>
              </form>
            </>
          ) : (
            <>
              {" "}
              <div className="text-center border p-5">
                {/* <div className="text-gray-300 text-9xl">
                  <ion-icon name="cart"></ion-icon>
                </div> */}
                <h3 className="text-sm md:text-base">
                  Please first add sections to the course .
                </h3>
                <Link href={`/teacher/addsection/${courseId}`}>
                  <button className="text-sm md:text-base p-2 inline-block mx-auto bg-red-500 my-4  text-gray-50 rounded font-semibold">
                    Add sections
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </MainTeacher>
  );
};

export default Id;
export async function getServerSideProps({ query, req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const courseId = query.Id;
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

  const q1 = courseSectionsDetailQuery(courseId);
  const { course_sections } = await client.fetch(q1);

  return {
    props: { course_sections }, // will be passed to the page component as props
  };
}
