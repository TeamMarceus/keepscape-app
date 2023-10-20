import { useState, useEffect } from 'react';

import { ReportsService } from '@/services';

const useReportedOrders = ({page, pageSize}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reportedOrders, setReportedOrders] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getReportedOrderss = async () => {
      const { data: getReportedOrdersResponse } = await ReportsService.orderList(
        // {page, pageSize}
      );

      if (getReportedOrdersResponse) {
        setReportedOrders(getReportedOrdersResponse);
        // setTotalPage(getReportedOrdersResponse.totalPage);
      }

      setIsLoading(false);
    };

    getReportedOrderss();
  }, []);

  return { isLoading, reportedOrders, totalPage };
};

export default useReportedOrders;
