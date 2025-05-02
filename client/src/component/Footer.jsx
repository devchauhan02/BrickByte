import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="w-full flex justify-center mt-10">
        <div className="w-[85%] h-px bg-gray-300" />
      </div>
      <footer className="w-full flex justify-center py-12 px-4 bg-white">
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left side */}
          <div className="flex flex-col items-start md:items-start ">
            
              <img
                src="./logo3.png"
                alt="Value"
                className="w-35 h-30"
              />

            <span className="text-gray-500 text-center md:text-left">
              Our vision is to make all people <br />
              the best place to live for them.
            </span>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-xl font-semibold text-gray-800">Information</span>
            <span className="text-gray-500">145 New York, FL 5467, USA</span>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 mt-4 font-medium text-gray-700">
              <span className="cursor-pointer hover:text-blue-500">Property</span>
              <span className="cursor-pointer hover:text-blue-500">Services</span>
              <span className="cursor-pointer hover:text-blue-500">Product</span>
              <span className="cursor-pointer hover:text-blue-500">About Us</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
