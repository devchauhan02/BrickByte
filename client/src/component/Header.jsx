import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../utils/common";
import useHeaderColor from "../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const headerColor = useHeaderColor();

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: headerColor }}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-1 px-6 sm:px-15 text-white">
        {/* Logo */}
        <Link to="/">
          <img src="./log3.png" alt="logo" className="w-24 sm:w-24 h-15" />
        </Link>

        {/* Desktop Menu */}
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div
            className="hidden md:flex gap-8 font-medium text-gray-300 items-center"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/properties">Properties</NavLink>
            <a href="mailto:devashishchauhan07@gmail.com">Contact</a>

            {!isAuthenticated ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                onClick={() => loginWithRedirect()}
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-white">{user?.name}</span>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
                  onClick={() =>
                    logout({ logoutParams: { returnTo: window.location.origin } })
                  }
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </OutsideClickHandler>

        {/* Mobile Icon */}
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

          {!isAuthenticated ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          ) : (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
