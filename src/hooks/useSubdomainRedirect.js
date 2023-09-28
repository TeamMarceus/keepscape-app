import { useRouter, useSearchParams } from 'next/navigation';

import { ADMIN_ROUTES } from '@/app/admin/routes';
import { PUBLIC_ROUTES } from '@/app/keepscape/routes';
import { userTypes } from '@/app-globals';
import { actions as usersActions } from '@/ducks/reducers/users';
import useActionDispatch from '@/hooks/useActionDispatch';
import { isLocal } from '@/utils/destinations';

const useSubdomainRedirect = () => {
  const router = useRouter();

  let next = useSearchParams().get('next');

  const loginRestart = useActionDispatch(
    usersActions.loginActions.loginRestart
  );

  const redirectToLocation = (loc) => {
      loginRestart();
      window.location.href = loc;
  };

  const redirect = (user, accessToken, refreshToken) => {
    const { role: userType } = user || {};

    if (userType === userTypes.ADMIN && !next) {
      next = ADMIN_ROUTES.DASHBOARD;
    } else if (userType === userTypes.BUYER && !next) {
      next = PUBLIC_ROUTES.MAIN_PAGE;
    }
    
    // let subdomain = null;
    // const { host } = window.location;
    // const arr = host.split('.').slice(0, isLocal() ? -1 : -2);

    // if (arr.length > 0) {
    //   [subdomain] = arr;
    // }

    // // Redirect to app if the user does not belong to a university
    // if (!isLocal()) {
    //   redirectToLocation(
    //     `PLATFORM/login?token=${accessToken}:${refreshToken}`
    //   );
    // }

    // This block here is added for local env subdomain redirect testing.
    // To test redirect, start node in the port `3001` then just login there.
    // const isInRedirectTestLocalEnv = host.includes('3000');
    // if (isLocal() && isInRedirectTestLocalEnv) {
    //   redirectToLocation(
    //     `http://localhost:3000/login?userType=${userType}&token=${accessToken}:${refreshToken}&next=${next}&user=${user}`
    //   );
    // }

    if (next) {
      router.replace(decodeURIComponent(next));
    }
  }

  return { redirect };
};

export default useSubdomainRedirect;
