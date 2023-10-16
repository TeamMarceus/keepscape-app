'use client';

import React, { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { userTypes } from '@/app-globals';
import { Footer, Navbar } from '@/components';
import { getUser, getAccessToken, getRefreshToken } from '@/ducks';
import { usePrivateRoute } from '@/hooks';

import styles from './styles.module.scss';

const RedirectPreloader = dynamic(() => import('@/components/Preloader'), {
  ssr: false,
});

export default function BuyerEffects({ children }) {
  const pathname = usePathname();
  const onCartPage = pathname === '/buyer/cart';
  const onCheckoutPage = pathname === '/buyer/checkout';

  const user = useSelector((store) => getUser(store));
  const accessToken = useSelector((store) => getAccessToken(store));
  const refreshToken = useSelector((store) => getRefreshToken(store));

  usePrivateRoute({ forUserType: userTypes.BUYER });

  const [isRedirectSuccessful, setIsRedirectSuccessful] = useState(
    !!accessToken && !!refreshToken && user.userType === userTypes.BUYER,
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
      <section className={styles.container}>
        {children}
      </section>
      {!onCartPage && !onCheckoutPage && <Footer />}
    </>
  );
}

BuyerEffects.propTypes = {
  children: PropTypes.node,
};