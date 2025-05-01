import React from "react";
import { HiLocationMarker } from "react-icons/hi";

const SearchBar = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center bg-white rounded-full border-[3px] border-gray-400/40 py-2 px-4 w-[25rem] justify-between">
      <HiLocationMarker color="#1f3e72" size={25} />
      <input
        type="text"
        className="outline-none border-none w-full px-2 text-black"
        placeholder="Search location"
        value={filter}
        onChange={(e) => setFilter(e.target.value)} 
      />
      <button className="bg-blue-500 text-white px-4 py-2 font-semibold rounded-full hover:bg-blue-600 transition cursor-pointer">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
