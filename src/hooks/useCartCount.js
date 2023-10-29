import { useState, useEffect } from 'react';

import { CartsService } from '@/services';

const useCartCount = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCartCount = async () => {
      setIsLoading(true);
      
      const { data: getCartCountResponse } = await CartsService.count();

      if (getCartCountResponse) {
        setCount(getCartCountResponse);
      }

      setIsLoading(false);
    };

    getCartCount();
  }, []);

  return { isLoading, count };
};

export default useCartCount;
