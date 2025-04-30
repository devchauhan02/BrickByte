import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../utils/common";
import useHeaderColor from "../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthCheck from "../hooks/useAuthCheck";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const { validateLogin } = useAuthCheck();

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: headerColor }}>
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-6 sm:px-10 text-white">
        {/* Logo */}
        <Link to="/">
          <img src="./logo3.png" alt="logo" className="w-[100px] h-[50px]" />
        </Link>

        {/* Desktop Menu */}
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div
            className={`hidden md:flex items-center gap-8 font-medium text-gray-200`}
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/properties" className="hover:text-white">
              Properties
            </NavLink>
            <a href="mailto:devashischauhan07@gmail.com" className="hover:text-white">
              Contact
            </a>

            {/* Add Property Button */}
            <div onClick={handleAddPropertyClick}>Add Property</div>

            {/* Login / Profile Menu */}
            {!isAuthenticated ? (
              <button
                onClick={loginWithRedirect}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
              >
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpened && (
        <div className="absolute top-[80px] right-6 bg-white text-black flex flex-col gap-6 p-8 rounded-lg shadow-md md:hidden z-50 font-medium">
          <NavLink to="/properties" onClick={() => setMenuOpened(false)}>
            Properties
          </NavLink>
          <a href="mailto:devashischauhan07@gmail.com" onClick={() => setMenuOpened(false)}>
            Contact
          </a>
          <button onClick={handleAddPropertyClick}>Add Property</button>

          {!isAuthenticated ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
              onClick={() => {
                setMenuOpened(false);
                loginWithRedirect();
              }}
            >
              Login
            </button>
          ) : (
            <ProfileMenu user={user} logout={logout} />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
