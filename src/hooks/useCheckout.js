import { useState } from 'react';

import { CartsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkout = async (cartItemIds) => {
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

  return { isLoading, checkout };
};

export default useCheckout;
