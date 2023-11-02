import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { getCartCount } from '@/ducks';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch } from '@/hooks';
import { CartsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useCart = () => {
  const cartCount = useSelector((store) => getCartCount(store));
  const loginUpdate = useActionDispatch(
    usersActions.loginActions.loginUpdate
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cart, setCart] = useState(null);

  const deleteCartItems = async (itemIds) => {
    try {
      setIsDeleting(true);
      const { status: deleteCartItemStatus } = await CartsService.deleteCart(itemIds);
  
      if (deleteCartItemStatus === 200) {
        toastSuccess(itemIds.length > 1 ? 'Items successfully deleted' : 'Item successfully deleted');
        
        loginUpdate({ cart_count: cartCount === 1 ? {} : cartCount - itemIds.length });
      } 

      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      toastError('Oops Something Went Wrong.');
    }
  }

  useEffect(() => {
    const getCart = async () => {
      const { data: getCartResponse } = await CartsService.retrieve();

      if (getCartResponse) {
        setCart(getCartResponse);
      }

      setIsLoading(false);
    };

    getCart();
  }, []);

  return { isLoading, cart, isDeleting, deleteCartItems };
};

export default useCart;
