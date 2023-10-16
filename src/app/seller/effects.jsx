'use client';

import React, { useState, useEffect } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { userTypes } from '@/app-globals';
import { Navbar } from '@/components';
import SellerSidebar from '@/components/SellerSidebar';
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

  usePrivateRoute({ forUserType: userTypes.SELLER });
  
  const [isRedirectSuccessful, setIsRedirectSuccessful] = useState(
    !!accessToken && !!refreshToken && user.userType === userTypes.SELLER,
  );

  useEffect(() => {
    if (!user.id) {
      setIsRedirectSuccessful(false);
    }
    
  }, [user]);

  if (!isRedirectSuccessful) {
    return <RedirectPreloader />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navbar />
      <SellerSidebar />
      <section className={styles.container}>
        {children}
      </section>
    </LocalizationProvider>
  );
}

SellerEffects.propTypes = {
  children: PropTypes.node,
};