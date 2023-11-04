import { useState } from 'react';

import { ReportsService } from '@/services';

const useReportProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const reportProduct = async (productId, reason) => {
    setIsLoading(true);

    let responseCode;

    try {
      const response = await ReportsService.reportProduct(productId, reason);

      responseCode = response.status;
    } catch (error) {
      responseCode = error.response.status;
      setIsLoading(false);
    }

    setIsLoading(false);

    return { responseCode };
  };

  return { isLoading, reportProduct };
};

export default useReportProduct;
