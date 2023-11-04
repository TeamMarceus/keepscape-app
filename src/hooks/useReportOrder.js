import { useState } from 'react';

import { ReportsService } from '@/services';

const useReportOrder = () => {
  const [isLoading, setIsLoading] = useState(false);

  const reportOrder = async (orderId, reason) => {
    setIsLoading(true);

    let responseCode;

    try {
      const response = await ReportsService.reportOrder(orderId, reason);

      responseCode = response.status;
    } catch (error) {
      responseCode = error.response.status;
      setIsLoading(false);
    }

    setIsLoading(false);

    return { responseCode };
  };

  return { isLoading, reportOrder };
};

export default useReportOrder;
