import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import OutsideClickHandler from "react-outside-click-handler";
import AddPropertyModel from "./AddPropertyModel";
import useAuthCheck from "../hooks/useAuthCheck";
import useHeaderColor from "../hooks/useHeaderColor";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const headerColor = useHeaderColor();
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const { validateLogin } = useAuthCheck();

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
      setMenuOpened(false);
    }
  };

  const closeMenu = () => setMenuOpened(false);

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: headerColor }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 text-white">
    
        <Link to="/">
          <img src="/logo.png" alt="logo" className="w-24" />
        </Link>

        <div className="hidden md:flex items-center gap-6 font-medium">
          <NavLink to="/properties" className="hover:text-white">Properties</NavLink>
          <a href="mailto:zainkeepscode@gmail.com" className="hover:text-white">Contact</a>
          <div className="cursor-pointer" onClick={handleAddPropertyClick}>Add Property</div>
          <AddPropertyModel opened={modalOpened} setOpened={setModalOpened} />
          {!isAuthenticated ? (
            <button onClick={loginWithRedirect} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Login</button>
          ) : (
            <ProfileMenu user={user} logout={logout} />
          )}
        </div>

        <div className="md:hidden cursor-pointer" onClick={() => setMenuOpened(prev => !prev)}>
          <BiMenuAltRight size={30} />
        </div>
      </div>

      {menuOpened && (
        <OutsideClickHandler onOutsideClick={closeMenu}>
          <div className="md:hidden absolute w-full bg-white text-black flex flex-col gap-4 px-6 py-4 font-medium shadow-lg z-50">
            <NavLink to="/properties" onClick={closeMenu} className="py-1">Properties</NavLink>
            <a href="mailto:zainkeepscode@gmail.com" onClick={closeMenu} className="py-1">Contact</a>
            <button onClick={handleAddPropertyClick} className="text-left py-1 cursor-pointer">Add Property</button>
            {!isAuthenticated ? (
              <button
                onClick={() => {
                  closeMenu();
                  loginWithRedirect();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Login
              </button>
            ) : (
              <div className="mt-2">
            
                <ProfileMenu user={user} logout={logout} />
              </div>
            )}
          </div>
        </OutsideClickHandler>
      )}
    </header>
  );
};

export default Header;
