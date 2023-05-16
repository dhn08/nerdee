import React from "react";

const FormSelection = ({
  iconName,
  type,
  name,
  placeholder,
  setInput,
  inputVal,
  sectors,
}) => {
  return (
    <div className="flex items-center border rounded-md my-2">
      <div className="w-2/12 mr-2 md:w-1/12 text-xl text-gray-400 flex justify-center items-center ">
        <span>{iconName}</span>
      </div>
      {/* <input
        placeholder={placeholder}
        value={inputVal}
        onChange={(e) => setInput(e.target.value)}
        className="w-9/12 md:w-10/12 block py-2 px-1 md:text-lg outline-none"
        type={type}
        name={name}
      /> */}
      <select
        required
        value={inputVal}
        onChange={(e) => setInput(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      >
        <option value="">Select category</option>
        {sectors.map((sector) => {
          return (
            <option key={sector._id} value={sector._id}>
              {sector.sector_name}
            </option>
          );
        })}
        {/* <option value="TV">TV/Monitors</option>
        <option value="PC">PC</option>
        <option value="GA">Gaming/Console</option>
        <option value="PH">Phones</option> */}
      </select>
    </div>
  );
};

export default FormSelection;
