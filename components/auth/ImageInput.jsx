import React from "react";
import { useDropzone } from "react-dropzone";
const ImageInput = ({ name, iconName, setInput, inputVal }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setInput(acceptedFiles[0]);
    },
  });
  return (
    <div className="flex items-center border rounded-md my-2">
      <div className="w-2/12 mr-2 md:w-1/12 text-xl text-gray-400 flex justify-center items-center ">
        <span>{iconName}</span>
      </div>
      <div
        {...getRootProps()}
        className={`border-2 cursor-pointer ml-3 border-dashed p-4 ${
          inputVal ? "hidden" : ""
        }`}
      >
        <input name={name} {...getInputProps()} />
        <p>Drag and drop an Course image here, or click to select an image.</p>
      </div>
      {inputVal && (
        <div className="mt-4">
          <p>Preview:</p>
          <img
            src={URL.createObjectURL(inputVal)}
            alt="Preview"
            className="mt-2 h-48"
          />
        </div>
      )}
      <div
        {...getRootProps()}
        className={`border-2 cursor-pointer border-dashed ml-3 p-4 ${
          inputVal ? "" : "hidden"
        }`}
      >
        <input name={name} {...getInputProps()} />
        <p>Change Image.</p>
      </div>
    </div>
  );
};

export default ImageInput;
