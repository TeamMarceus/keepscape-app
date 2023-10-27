import { useState } from 'react';

import { OrdersService } from '@/services';

const useAddOrderLogs = () => {
  const [isAdding, setIsAdding] = useState(false);

  const addOrderLogs = async (orderId, log) => {
    setIsAdding(true);

    let responseCode;

    try {
      const response = await OrdersService.addOrderLogs(orderId, log);

      responseCode = response.status;
    } catch (error) {
      responseCode = error.response.status;
      setIsAdding(false);
    }

    setIsAdding(false);

    return { responseCode };
  };

  return { isAdding, addOrderLogs };
};

export default useAddOrderLogs;
