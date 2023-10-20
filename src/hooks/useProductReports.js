import { useState, useEffect } from 'react';

import { ReportsService } from '@/services';

const useProductReports = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [productReports, setProductReports] = useState([]);

  useEffect(() => {
    const getProductReports = async () => {
      const { data: getProductsReportResponse } = await ReportsService.productReports(id);

      if (getProductsReportResponse) {
        setProductReports(getProductsReportResponse);
      }

      setIsLoading(false);
    };

    getProductReports();
  }, []);

  return { isLoading, productReports };
};

export default useProductReports;
