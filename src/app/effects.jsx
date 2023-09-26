'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { AUTHENTICATION_ROUTES } from './(authentication)/routes';

export default function AppEffects({ children }) {
  const router = useRouter();
 
  useEffect(() => {
    const channel = new BroadcastChannel('getgiftideas-logout');
  
    const handleLogout = () => {
      // Go to logout page first to reset all user data. This will also
      // ensure that no api calls would result in errors.
      router.push(AUTHENTICATION_ROUTES.LOGOUT);

      // Set timer to go to login page after 1s. Since
      // the user will be stuck in the logout page if they are forcibly logged out.
      // This could be because the router push of logout conflicts with the
      // force logout.
      setTimeout(() => {
        router.push(AUTHENTICATION_ROUTES.LOGIN);
      }, [1000]);
    }
    channel.addEventListener('message', handleLogout);
  
    return () => {
      channel.removeEventListener('message', handleLogout);
      channel.close();
    };
  }, []);
 
  return children;
}
