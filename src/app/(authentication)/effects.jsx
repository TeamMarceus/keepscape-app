'use client';

import React, { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import Logo from '%/images/Logo/logo-name.svg';

import { userTypes } from '@/app-globals';
import { getUser, getAccessToken, getRefreshToken } from '@/ducks';
import { actions as usersActions } from '@/ducks/reducers/users';
import useActionDispatch from '@/hooks/useActionDispatch';

import { AuthenticationContext } from './context';
import styles from './styles.module.scss';

const RedirectPreloader = dynamic(() => import('@/components/Preloader'), {
  ssr: false,
});


export default function AuthenticationEffects({ children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector((store) => getUser(store));
  const accessToken = useSelector((store) => getAccessToken(store));
  const refreshToken = useSelector((store) => getRefreshToken(store));

  const loginUpdate = useActionDispatch(usersActions.loginActions.loginUpdate);

  const next = searchParams.get('next');

  const userTypeParam = user.role;

  const [isRedirectedLoggingIn, setIsRedirectedLoggingIn] = useState(
    !!accessToken && !!refreshToken
  );

  // This state is used to prevent logo and subdomain assets from rendering on login redirect
  const [isRedirectSuccessful, setIsRedirectSuccessful] = useState(false);
  
  const redirectUserLogin = async () => {

    loginUpdate({
      user,
      access_token: accessToken,
      refresh_token: refreshToken,
      was_redirected: true,
    });

    setIsRedirectSuccessful(true);
    setIsRedirectedLoggingIn(false);

    if (next) {
      router.push(decodeURIComponent(next));
    }
  };

  useEffect(() => {
    if (accessToken && refreshToken) {
      redirectUserLogin();
    }
  }, []);

  const [userType, setUserType] = useState(null);
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    if (userTypeParam === userTypes.ADMIN && !isRedirected) {
      setIsRedirected(true);
      setUserType(userTypes.ADMIN);
    }

    if (userTypeParam === userTypes.BUYER && !isRedirected) {
      setIsRedirected(true);
      setUserType(userTypes.BUYER);
    }

    if (!userTypeParam) {
      setIsRedirectSuccessful(false);
    }
    
  }, [userTypeParam, isRedirected]);

  if (isRedirectedLoggingIn) {
    return <RedirectPreloader />;
  }

  return (
    <section className={styles.container}>
      {!isRedirectSuccessful && (
            <Image
              priority
              alt="Logo"
              className={styles.container_logo}
              src={Logo}
              width={300}
            />
        )} 

        <AuthenticationContext.Provider value={userType}>
          {children}
        </AuthenticationContext.Provider>
      </section>
  );
}

AuthenticationEffects.propTypes = {
  children: PropTypes.node,
};