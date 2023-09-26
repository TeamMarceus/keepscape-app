import { useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

import { AUTHENTICATION_ROUTES } from '@/app/(authentication)/routes';
import { ADMIN_ROUTES } from '@/app/admin/routes';
import { BUYER_ROUTES } from '@/app/gift-giver/routes';
import { userTypes } from '@/app-globals';

import { getUser } from '../ducks';

const usePrivateRoute = ({ forUserType }) => {
  const user = useSelector((store) => getUser(store));

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const fullPathname =
    searchParams.toString() !== ''
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

  const { guid: userId, role: userType } = user || {};

  useEffect(() => {
    const checkAccess = () => {
      // the page can be accessed by the user
      if (
        (userType != null && !!userId) &&
        (userType === userTypes.BUYER &&
          forUserType === userTypes.BUYER) ||
        (userType === userTypes.ADMIN &&
          forUserType === userTypes.ADMIN)
      ) {
        return;
      }

      /**
       *   Table for pages that can be accessed by the different user types
       *    -----------------------------
       *   | Type | Gift Giver | Admin  |
       *    -----------------------------
       *   |  G   |    /       |    x   |   
       *    -----------------------------
       *   |  A   |    x       |    /   |  
       *    -----------------------------
       */
      if (
        userType === userTypes.BUYER &&
        forUserType !== userTypes.BUYER
      ) {
        router.replace(BUYER_ROUTES.HISTORY);
        return;
      }

      if (
        userType === userTypes.ADMIN &&
        forUserType !== userTypes.ADMIN
      ) {
        router.replace(ADMIN_ROUTES.DASHBOARD);
        return;
      }

      const nextParam =
        pathname !== AUTHENTICATION_ROUTES.LOGOUT
          ? encodeURIComponent(fullPathname)
          : null;

      const loginUrl = nextParam
        ? `${AUTHENTICATION_ROUTES.LOGIN}?next=${nextParam}`
        : AUTHENTICATION_ROUTES.LOGIN;

      router.replace(loginUrl);
    };

    checkAccess();
  }, [userType, forUserType]);
};

export default usePrivateRoute;
