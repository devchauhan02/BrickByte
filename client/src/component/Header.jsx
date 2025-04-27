import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../utils/common";
import useHeaderColor from "../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: headerColor }}
    >
      {/* Content wrapper */}
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-6 sm:px-15 text-white">
        {/* Logo */}
        <img src="./logo.png" alt="logo" className="w-24 sm:w-20" />

        {/* Menu */}
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div
            className="hidden md:flex gap-8 font-medium text-gray-300 items-center"
            style={getMenuStyles(menuOpened)}
          >
            <a href="#residencies" className="hover:text-white transition">Residencies</a>
            <a href="#value" className="hover:text-white transition">Our Value</a>
            <a href="#contact-us" className="hover:text-white transition">Contact Us</a>
            <a href="#get-started" className="hover:text-white transition">Get Started</a>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              <a href="mailto:devashishchauhan07@gmail.com">Contact</a>
            </button>
          </div>
        </OutsideClickHandler>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden block text-white cursor-pointer"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpened && (
        <div className="absolute top-[80px] right-6 bg-white text-black flex flex-col gap-6 p-8 rounded-lg shadow-md md:hidden z-50 font-medium">
          <a href="#residencies">Residencies</a>
          <a href="#value">Our Value</a>
          <a href="#contact-us">Contact Us</a>
          <a href="#get-started">Get Started</a>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            <a href="mailto:zainkeepscode@gmail.com">Contact</a>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
