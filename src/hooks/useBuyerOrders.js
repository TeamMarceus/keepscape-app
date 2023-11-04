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
  const [isConfirming, setIsConfirming] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const cancelOrder = async (orderId) => {
    try {
      setIsCancelling(true);
      const { status: cancelOrderStatus } = await OrdersService.cancelBuyerOrder(orderId);
  
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

  const confirmOrder = async (orderId) => {
    try {
      setIsConfirming(true);
      const { status: cancelOrderStatus } = await OrdersService.confirmOrder(orderId);
  
      if (cancelOrderStatus === 200) {
        toastSuccess('Order successfully confirmed.');

        setOrders((prevOrders) =>
          prevOrders.filter((ord) => ord.id !== orderId)
        );

      } 
      setIsConfirming(false);

    } catch (error) {
      setIsConfirming(false);
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
    isConfirming,
    confirmOrder,
    setOrders,
  };
};

export default useBuyerOrders;
