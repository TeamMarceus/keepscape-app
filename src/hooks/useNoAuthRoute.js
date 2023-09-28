import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

import { ADMIN_ROUTES } from '@/app/admin/routes';
import { PUBLIC_ROUTES } from '@/app/keepscape/routes';
import { userTypes } from '@/app-globals';

import { getUser } from '../ducks';

const useNoAuthRoute = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const user = useSelector((store) => getUser(store));

  const next = searchParams.get('next');

  const {
    guid: userId,
    role: userType,
    firstName,
    lastName,
  } = user || {};


  useEffect(() => {
    const handleUserDataChange = () => {
      // if the user is logged in, redirect them to the homepage
      if (userId && next) {
        router.replace(decodeURIComponent(next));
        return;
      }

      // redirect the student to the buyer homepage
      if (userType === userTypes.BUYER) {
        router.replace(PUBLIC_ROUTES.MAIN_PAGE);
        return;
      }

      // redirect the admin to the admin homepage
      if (userType === userTypes.ADMIN) {
        router.replace(ADMIN_ROUTES.DASHBOARD);
      }
    };

    handleUserDataChange();
  }, [userId, userType, firstName, lastName]);
};

export default useNoAuthRoute;
