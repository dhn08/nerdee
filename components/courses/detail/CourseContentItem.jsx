import React from "react";
// import { IoCaretForwardCircleSharp } from "react-icons/io";
import { IoCaretForwardCircleSharp } from "react-icons/io5";
import formatTime from "../../../utils/formatTime";
function CourseContentItem({ data, setSrc }) {
  const handleClick = () => {
    if (setSrc) {
      setSrc(data.file.asset.url);
    }
  };

  return (
    <div
      onClick={handleClick}
      className=" cursor-pointer flex justify-between items-center px-3 py-2"
    >
      <div className="flex ">
        <div className="mr-1 flex items-center justify-center">
          <IoCaretForwardCircleSharp />
        </div>
        <div>
          <h3 className="text-sm md:text-lg font-medium ">{data.title}</h3>
        </div>
      </div>
      <div>
        <p className="text-sm md:text-base">{formatTime(data.duration)}</p>
      </div>
    </div>
  );
}

export default CourseContentItem;
