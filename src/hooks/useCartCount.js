import { useState, useEffect } from 'react';

import { actions as usersActions } from '@/ducks/reducers/users';
import { CartsService } from '@/services';

import useActionDispatch from './useActionDispatch';

const useCartCount = () => {
  const loginUpdate = useActionDispatch(
    usersActions.loginActions.loginUpdate
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCartCount = async () => {
      setIsLoading(true);
      
      const { data: getCartCountResponse } = await CartsService.count();
  
      if (getCartCountResponse) {
        console.log(getCartCountResponse);
        loginUpdate({ cart_count: getCartCountResponse === 0 ? {} : getCartCountResponse });
      }
  
      setIsLoading(false);
    };

    getCartCount();
  }, []);

  return {isLoading};
};

export default useCartCount;
