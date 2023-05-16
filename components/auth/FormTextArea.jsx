import React from "react";

const FormTextArea = ({
  iconName,
  type,
  name,
  placeholder,
  setInput,
  inputVal,
}) => {
  return (
    <div className="flex items-center border rounded-md my-2">
      <div className="w-2/12 mr-2 md:w-1/12 text-xl text-gray-400 flex justify-center items-center ">
        <span>{iconName}</span>
      </div>
      <textarea
        required
        placeholder={placeholder}
        value={inputVal}
        onChange={(e) => setInput(e.target.value)}
        className="w-9/12 md:w-10/12 block py-2 px-1 md:text-lg outline-none"
        name={name}
      />
    </div>
  );
};

export default FormTextArea;
