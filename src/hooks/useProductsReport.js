import { useState, useEffect } from 'react';

import { ReportsService } from '@/services';

const useProductsReport = ({page, pageSize}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [productsReport, setProductsReport] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getProductsReports = async () => {
      const { data: getProductsReportResponse } = await ReportsService.productList(
        // {page, pageSize}
      );

      if (getProductsReportResponse) {
        setProductsReport(getProductsReportResponse);
        // setTotalPage(getProductsReportResponse.totalPage);
      }

      setIsLoading(false);
    };

    getProductsReports();
  }, []);

  return { isLoading, productsReport, totalPage };
};

export default useProductsReport;
