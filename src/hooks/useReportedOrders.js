import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { ReportsService } from '@/services';

const useReportedOrders = ({page, pageSize, sellerName, buyerName}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reportedOrders, setReportedOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const resolveOrderReports = async (orderId) => {
    try {
      const { status: resolveOrderReportsStatus } = await ReportsService.resolveOrderReports(orderId);
  
      if (resolveOrderReportsStatus === 200) {
        toast.success('Order reports resolved.', {
          style: {
            backgroundColor: '#1ab394',
            color: '#fff',
          },
        });
        
        setReportedOrders((prevReportedOrders) =>
          prevReportedOrders.filter((order) => order.id !== orderId)
        );
      } 

    } catch (error) {
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });
    }
  };

  useEffect(() => {
    const getReportedOrderss = async () => {
      const { data: getReportedOrdersResponse } = await ReportsService.orderList(
        {page, pageSize, sellerName, buyerName}
      );

      if (getReportedOrdersResponse) {
        setReportedOrders(getReportedOrdersResponse.orders);
        setTotalPages(getReportedOrdersResponse.pageCount);
      }

      setIsLoading(false);
    };

    getReportedOrderss();
  }, [page, pageSize, sellerName, buyerName]);

  return { isLoading, reportedOrders, totalPages, resolveOrderReports };
};

export default useReportedOrders;
