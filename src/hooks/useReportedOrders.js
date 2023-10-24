import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { ReportsService } from '@/services';

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
    
      setIsResolvingLoading(false);
    } catch (error) {
      setIsResolvingLoading(false);
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });
    }
  };

  const refundOrder = async (orderId) => {
    try {
      setIsRefundingLoading(true);

      const { status: refundOrderStatus } = await ReportsService.refund(orderId);
  
      if (refundOrderStatus === 200) {
        toast.success('Order successfully refunded.', {
          style: {
            backgroundColor: '#1ab394',
            color: '#fff',
          },
        });
        
        setReportedOrders((prevReportedOrders) =>
          prevReportedOrders.filter((order) => order.id !== orderId)
        );
      } 
    
      setIsRefundingLoading(false);
    } catch (error) {
      setIsRefundingLoading(false);
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
