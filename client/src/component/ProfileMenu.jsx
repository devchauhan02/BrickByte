import React from 'react';
import { Avatar, Menu } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();

  return (
    <Menu position="bottom-end" shadow="md">
      <Menu.Target>
        <Avatar className='cursor-pointer'
          src={user?.picture}
          alt="user image"
          width={40}
          height={40}
          
        />
      </Menu.Target>

      <Menu.Dropdown>
      <Menu.Item onClick={()=> navigate("./favourites", {replace: true})}>
                Favourites
            </Menu.Item>

            <Menu.Item onClick={()=> navigate("./bookings", {replace: true})}>
                Bookings
            </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout({ logoutParams: { returnTo: window.location.origin } });
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
