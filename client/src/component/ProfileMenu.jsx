import React from 'react';
import { Avatar, Menu } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();

  return (
    <Menu position="bottom-end" shadow="md">
      <Menu.Target>
        <Avatar
          src={user?.picture}
          alt="user image"
          width={40}
          height={40}
          
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          Favourites
        </Menu.Item>
        <Menu.Item>
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
