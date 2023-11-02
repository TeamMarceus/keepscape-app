import { useState } from 'react';

import { CartsService, ProductsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkoutOrder = async (cartItemIds) => {
    setIsLoading(true);

    try {
      const response = await CartsService.checkout(cartItemIds);

      if (response.status === 200) {
        toastSuccess('Order successfully placed.');
      }
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
      }
    } catch (error) {
      toastError('Oops Something Went Wrong.');
    }

    setIsLoading(false);
  }

  return { isLoading, checkoutOrder, checkoutProduct };
};

export default useCheckout;
