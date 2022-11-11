import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
const WhatLearntItem = ({ msg }) => {
  return (
    <div className="flex my-2 md:my-0">
      <div className="mr-2 text-xl">
        <AiOutlineCheck />
      </div>
      <p>{msg}</p>
    </div>
  );
};

export default WhatLearntItem;
