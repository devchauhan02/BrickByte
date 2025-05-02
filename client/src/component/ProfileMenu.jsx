import React from 'react';
import { Avatar, Menu } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ user, logout, mobile = false, closeMenu }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    if (closeMenu) closeMenu();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    if (closeMenu) closeMenu();
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (mobile) {
    return (
      <>
        <div className="flex items-center gap-2 py-2">
          <Avatar src={user?.picture} alt="user image" size="sm" />
          <span>{user?.name}</span>
        </div>
        <button onClick={() => handleNavigate("/favourites")} className="text-left py-1">Favourites</button>
        <button onClick={() => handleNavigate("/bookings")} className="text-left py-1">Bookings</button>
        <button onClick={handleLogout} className="text-left py-1">Logout</button>
      </>
    );
  }

  return (
    <Menu position="bottom-end" shadow="md" withinPortal={false}>
      <Menu.Target>
        <Avatar className="cursor-pointer" src={user?.picture} alt="user image" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => handleNavigate("/favourites")}>Favourites</Menu.Item>
        <Menu.Item onClick={() => handleNavigate("/bookings")}>Bookings</Menu.Item>
        <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
