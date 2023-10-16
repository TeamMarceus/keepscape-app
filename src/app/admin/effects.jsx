'use client';

import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { userTypes } from '@/app-globals';
import { AdminSidebar, Navbar } from '@/components';
import { getUser, getAccessToken, getRefreshToken } from '@/ducks';
import { usePrivateRoute } from '@/hooks';

import styles from './styles.module.scss';

const RedirectPreloader = dynamic(() => import('@/components/Preloader'), {
  ssr: false,
});

export default function AdminEffects({ children }) {
  const user = useSelector((store) => getUser(store));
  const accessToken = useSelector((store) => getAccessToken(store));
  const refreshToken = useSelector((store) => getRefreshToken(store));

  usePrivateRoute({ forUserType: userTypes.ADMIN });

  const [isRedirectSuccessful, setIsRedirectSuccessful] = useState(
    !!accessToken && !!refreshToken && user.userType === userTypes.ADMIN,
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
    <>
      <Navbar />
      <AdminSidebar />
      <section className={styles.container}>
        {children}
      </section>
    </>
  );
}

AdminEffects.propTypes = {
  children: PropTypes.node,
};