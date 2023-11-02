import { useState, useEffect } from 'react';

import { OrdersService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useBuyerOrders = ({
  status,
  search,
  productName,
  buyerName,
  sellerName,
  page,
  pageSize,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const cancelOrder = async (orderId) => {
    try {
      setIsCancelling(true);
      const { status: cancelOrderStatus } = await OrdersService.cancelOrder(orderId);
  
      if (cancelOrderStatus === 200) {
        toastSuccess('Order successfully cancelled.');

        setOrders((prevOrders) =>
          prevOrders.filter((ord) => ord.id !== orderId)
        );

      } 
      setIsCancelling(false);

    } catch (error) {
      setIsCancelling(false);
      toastError('Oops Something Went Wrong.');
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const getBuyerOrders = async () => {
      const { data: getBuyerOrdersResponse } = await OrdersService.retrieveBuyerOrders({
        status,
        search,
        productName,
        buyerName,
        sellerName,
        page,
        pageSize,
      });

      if (getBuyerOrdersResponse) {
        setOrders(getBuyerOrdersResponse.orders);
        setTotalPages(getBuyerOrdersResponse.pageCount);
      }

      setIsLoading(false);
    };

    getBuyerOrders();
  }, [
      status,
      search,
      productName,
      buyerName,
      sellerName,
      page,
      pageSize
    ]);

  return { 
    isLoading, 
    orders, 
    totalPages, 
    isCancelling,
    cancelOrder, 
    setOrders,
  };
};

export default useBuyerOrders;
