import { useState, useEffect } from 'react';

import { CartsService } from '@/services';

const useCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(null);

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

  return { isLoading, cart };
};

export default useCart;
