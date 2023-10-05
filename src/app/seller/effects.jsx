'use client';

import React, { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { userTypes } from '@/app-globals';
import { Footer, Navbar } from '@/components';
import Sidebar from '@/components/Sidebar';
import { getUser, getAccessToken, getRefreshToken } from '@/ducks';
import { usePrivateRoute } from '@/hooks';

import styles from './styles.module.scss';

const RedirectPreloader = dynamic(() => import('@/components/Preloader'), {
  ssr: false,
});

export default function SellerEffects({ children }) {
  const user = useSelector((store) => getUser(store));
  const accessToken = useSelector((store) => getAccessToken(store));
  const refreshToken = useSelector((store) => getRefreshToken(store));

  // usePrivateRoute({ forUserType: userTypes.BUYER });

  const isRedirectSuccessful = true;
  // const [isRedirectSuccessful, setIsRedirectSuccessful] = useState(
  //   !!accessToken && !!refreshToken && user.role === userTypes.SELLER,
  // );

  // useEffect(() => {
  //   if (!user.guid) {
  //     setIsRedirectSuccessful(false);
  //   }
    
  // }, [user]);

  if (!isRedirectSuccessful) {
    return <RedirectPreloader />;
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <section className={styles.container}>
        {children}
      </section>
    </>
  );
}

SellerEffects.propTypes = {
  children: PropTypes.node,
};