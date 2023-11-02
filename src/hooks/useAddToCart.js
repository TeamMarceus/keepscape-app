import { useState } from 'react';

import { useSelector } from 'react-redux';

import { getCartCount } from '@/ducks';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch } from '@/hooks';
import { CartsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useAddToCart = () => {
  const cartCount = useSelector((store) => getCartCount(store));
  const loginUpdate = useActionDispatch(
    usersActions.loginActions.loginUpdate
  );

  const [isAdding, setIsAdding] = useState(false);

  const addToCart = async (product) => {
    setIsAdding(true);

    try {
      const { status: addToCartStatus } = await CartsService.add(product);

      if (addToCartStatus === 200) {
        toastSuccess('Product successfully added to cart.');
        loginUpdate({ cart_count: cartCount + 1 });
      } else {
        toastError('Oops Something Went Wrong.');
      }

      setIsAdding(false);
    } catch (error) {
      toastError('Oops Something Went Wrong.');
      
      setIsAdding(false);
    }
  };

  return { isAdding, addToCart };
};

export default useAddToCart;
