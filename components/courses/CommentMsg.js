import React, { useEffect, useState } from "react";

function CommentMsg({ comment, num }) {
  // const colorsArray = ["blue", "indigo", "red", "yellow", "green"];
  // const [c, setC] = useState(color);

  // useEffect(() => {
  //   console.log("Han bhai kya bogaya:", colorsArray[color]);
  //   console.log("Han bhai kya bogaya color index:", color);

  //   setC(colorsArray[color]);
  // }, []);
  // console.log("color", color);
  // const colors = ["blue", "indigo", "red", "yellow", "green"];
  // const [c, setc] = useState("red");
  // useEffect(() => {
  //   console.log("Inside commentMsg");
  //   setc(colors[color]);
  //   console.log(c);
  // }, []);
  // console.log(
  //   `md:h-16 h-11 w-11 md:w-16 rounded-full flex justify-center items-center bg-${color}-600`
  // );

  const texts = [
    `md:h-16 h-11 w-11 md:w-16 rounded-full flex justify-center items-center bg-red-600`,
    `md:h-16 h-11 w-11 md:w-16 rounded-full flex justify-center items-center bg-green-600`,
    `md:h-16 h-11 w-11 md:w-16 rounded-full flex justify-center items-center bg-yellow-600`,
    `md:h-16 h-11 w-11 md:w-16 rounded-full flex justify-center items-center bg-blue-600`,
  ];

  return (
    <div className="flex py-4 border-b  ">
      <div className="flex justify-center mr-3">
        <div className={texts[num]}>
          <p className="text-gray-100 font-semibold">
            {comment.user.name[0].toUpperCase()}
          </p>
        </div>
      </div>
      <div className="w-full">
        <h3 className="md:text-xl bg-sl  font-semibold my-3">
          {comment.user.name}
        </h3>
        <p className="w-10/12 text-sm md:text-base">{comment.message}</p>
      </div>
    </div>
  );
}

export default CommentMsg;
