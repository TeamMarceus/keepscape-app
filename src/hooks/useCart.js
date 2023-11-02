import { useState, useEffect } from 'react';

import { CartsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cart, setCart] = useState(null);

  const deleteCartItems = async (itemIds) => {
    try {
      setIsDeleting(true);
      const { status: deleteCartItemStatus } = await CartsService.deleteCart(itemIds);
  
      if (deleteCartItemStatus === 200) {
        toastSuccess(itemIds.length > 1 ? 'Items successfully deleted' : 'Item successfully deleted');
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
