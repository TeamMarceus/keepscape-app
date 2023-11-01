import { useState } from 'react';

import { toast } from 'sonner';

import { CartsService } from '@/services';

const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkout = async (cartItemIds) => {
    setIsLoading(true);

    try {
      const response = await CartsService.checkout(cartItemIds);

      if (response.status === 200) {
        toast.success('Order successfully placed.', {
          style: {
            backgroundColor: '#1ab394',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });
    }

    setIsLoading(false);
  };

  return { isLoading, checkout };
};

export default useCheckout;
