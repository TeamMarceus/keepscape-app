import { useState, useEffect } from 'react';

import { ReportsService } from '@/services';

const useOrdersReport = ({page, pageSize}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ordersReport, setOrdersReport] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getOrdersReports = async () => {
      const { data: getOrdersReportResponse } = await ReportsService.orderList(
        // {page, pageSize}
      );

      if (getOrdersReportResponse) {
        setOrdersReport(getOrdersReportResponse);
        // setTotalPage(getOrdersReportResponse.totalPage);
      }

      setIsLoading(false);
    };

    getOrdersReports();
  }, []);

  return { isLoading, ordersReport, totalPage };
};

export default useOrdersReport;
