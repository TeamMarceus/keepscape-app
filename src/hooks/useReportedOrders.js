import { useState, useEffect } from 'react';

import { ReportsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useReportedOrders = ({page, pageSize, search}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isResolvingLoading, setIsResolvingLoading] = useState(false);
  const [isRefundingLoading, setIsRefundingLoading] = useState(false);
  const [reportedOrders, setReportedOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const resolveOrderReports = async (orderId) => {
    try {
      setIsResolvingLoading(true);

      const { status: resolveOrderReportsStatus } = await ReportsService.resolveOrderReports(orderId);
  
      if (resolveOrderReportsStatus === 200) {
        toastSuccess('Order reports resolved.');
        
        setReportedOrders((prevReportedOrders) =>
          prevReportedOrders.filter((order) => order.id !== orderId)
        );
      } 
    
      setIsResolvingLoading(false);
    } catch (error) {
      setIsResolvingLoading(false);
      toastError('Oops Something Went Wrong.');
    }
  };

  const refundOrder = async (orderId) => {
    try {
      setIsRefundingLoading(true);

      const { status: refundOrderStatus } = await ReportsService.refund(orderId);
  
      if (refundOrderStatus === 200) {
        toastSuccess('Order successfully refunded.');
        
        setReportedOrders((prevReportedOrders) =>
          prevReportedOrders.filter((order) => order.id !== orderId)
        );
      } 
    
      setIsRefundingLoading(false);
    } catch (error) {
      setIsRefundingLoading(false);
      toastError('Oops Something Went Wrong.');
    }
  };

  useEffect(() => {
    const getReportedOrderss = async () => {
      const { data: getReportedOrdersResponse } = await ReportsService.orderList(
        {
          page,
          pageSize, 
          sellerName : search, 
          buyerName : search
        }
      );

      if (getReportedOrdersResponse) {
        setReportedOrders(getReportedOrdersResponse.orders);
        setTotalPages(getReportedOrdersResponse.pageCount);
      }

      setIsLoading(false);
    };

    getReportedOrderss();
  }, [page, pageSize, search]);

  return { 
    isLoading, 
    isResolvingLoading, 
    isRefundingLoading,
    reportedOrders, 
    totalPages, 
    resolveOrderReports, 
    refundOrder 
  };
};

export default useReportedOrders;
