import { useState, useEffect } from 'react';

import { OrdersService } from '@/services';

const useGift = (orderItemId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [gift, setGift] = useState(null);

  useEffect(() => {
    const getGift = async () => {
      const { data: getGiftResponse } = await OrdersService.retrieveGift(
        orderItemId
      );

      if (getGiftResponse) {
        setGift(getGiftResponse);
      }

      setIsLoading(false);
    };

    getGift();

  }, []);

  return { isLoading, gift };
};

export default useGift;
