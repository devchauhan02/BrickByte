import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';
import UserDetailContext from '../context/UserDetailContext';
import { createUser } from '../utils/api';
const Layout = () => {


  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetail } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegsiter = async () => {

      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "https://dev-dlyhq0f4hkcg6xtu.us.auth0.com/api/v2/",
          scope: "openid profile email",
        },
      });
      localStorage.setItem("access_token", res);
      setUserDetail((prev) => ({ ...prev, token: res }));
      mutate(res)
    };
 

    isAuthenticated && getTokenAndRegsiter();
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;