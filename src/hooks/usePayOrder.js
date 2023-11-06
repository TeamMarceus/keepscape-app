import { useState } from 'react';

import { OrdersService } from '@/services';

const usePayOrder = () => {
  const [isPaying, setIsPaying] = useState(false);

  const payOrder = async (orderId, paypalOrderId) => {
    setIsPaying(true);

    let responseCode;

    try {
      const response = await OrdersService.payOrder(orderId, paypalOrderId);

      responseCode = response.status;
    } catch (error) {
      responseCode = error.response.status;
      setIsPaying(false);
    }

    setIsPaying(false);

    return { responseCode };
  };

  const generateGift = async (orderId) => {
    setIsPaying(true);

    let responseCode;

    try {
      const response = await OrdersService.generateGift(orderId);

      responseCode = response.status;
    } catch (error) {
      responseCode = error.response.status;
      setIsPaying(false);
    }

    setIsPaying(false);

    return { responseCode };
  };

  return { isPaying, payOrder, generateGift };
};

export default usePayOrder;
