import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { getCartCount } from '@/ducks';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch } from '@/hooks';
import { CartsService, ProductsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useCheckout = () => {
  const router = useRouter();
  const cartCount = useSelector((store) => getCartCount(store));
  const loginUpdate = useActionDispatch(
    usersActions.loginActions.loginUpdate
  );
  const [isLoading, setIsLoading] = useState(false);

  const checkoutOrder = async (cartItemIds) => {
    setIsLoading(true);

    try {
      const response = await CartsService.checkout(cartItemIds);

      if (response.status === 200) {
        toastSuccess('Order successfully placed.');

        loginUpdate({ 
          cart_count: cartCount === 1 ? {} : cartCount - cartItemIds.length, 
          checkout_cart: [],
        });
      }

      router.push('/buyer/account?activeTab=orders');
    } catch (error) {
      toastError('Oops Something Went Wrong.');
    }

    setIsLoading(false);
  };

  const checkoutProduct = async (productId, body) => {
    setIsLoading(true);

    try {
      const response = await ProductsService.checkout(productId, body);

      if (response.status === 200) {
        toastSuccess('Order successfully placed.');
        
        loginUpdate({ 
          checkout_cart: [],
        });

        router.push('/buyer/account?activeTab=orders');
      }
    } catch (error) {
      toastError('Oops Something Went Wrong.');
    }

    setIsLoading(false);
  }

  return { isLoading, checkoutOrder, checkoutProduct };
};

export default useCheckout;
