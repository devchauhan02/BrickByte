import React, { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import data from "../utils/accordion.jsx";

const Value = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section id="value" className="w-full flex justify-center py-8 px-4">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-9">
        {/* Left Side */}
        <div className="flex-1 flex justify-center items-start">
          <div className="w-110 h-full max-h-[500px] overflow-hidden rounded-t-[18rem] border-[6px] border-gray-200 flex justify-center">
            <img
              src="./value.png"
              alt="Value"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-orange-500 font-semibold text-lg">Our Value</span>
          <span className="text-3xl font-bold" style={{ color: "#1f3e72" }}>Value We Give to You</span>
          <span className="text-gray-600">
            We are always ready to help by providing the best services for you.
            <br />
            We believe a good place to live can make your life better.
          </span>

          <div className="w-full mt-8">
            {data.map((item, index) => (
              <div
                key={index}
                className={`mb-5 rounded-lg overflow-hidden transition-all duration-300 ${
                  expandedIndex === index ? "shadow-lg border border-gray-300" : "border border-gray-200"
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full bg-white p-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded">
                      {item.icon}
                    </div>
                    <span className="text-lg font-semibold" style={{ color: "#1f3e72" }}>
                      {item.heading}
                    </span>
                  </div>
                  <div className={`flex items-center transform transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`}>
                    <MdOutlineArrowDropDown size={24} />
                  </div>
                </div>

                {/* Accordion Content */}
                {expandedIndex === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600">{item.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Value;
