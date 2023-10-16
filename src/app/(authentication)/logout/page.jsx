'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch } from '@/hooks';
import { UsersService } from '@/services';

export default function LogoutPage() {
  const loginRestart = useActionDispatch(
    usersActions.loginActions.loginRestart
  );

  const router = useRouter();

  useEffect(() => {

    const logoutUser = async () => {
      try {
        const { status } = await UsersService.logout();

        if (status === 200) {
          loginRestart();  
          router.push('/login');
        }
      } catch (error) {
        console.log(error);
        router.push('/login');
      }
    };
    
    logoutUser();

  }, []);

  return null;
}
