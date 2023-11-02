import { useState, useEffect } from 'react';

import { OrdersService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useSellerOrders = ({
  status,
  search,
  productName,
  buyerName,
  sellerName,
  page,
  pageSize,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSettingDelivered, setIsSettingDelivered] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const addDeliveryFee = async (orderId, body) => {
    try {
      setIsAdding(true);
      const { status: addDeliveryFeeStatus } = await OrdersService.updateOrderDeliveryFee(orderId, body);
  
      if (addDeliveryFeeStatus === 200) {
        toastSuccess('Delivery fee successfully added.');

        setOrders((prevOrders) =>
          prevOrders.filter((ord) => ord.id !== orderId)
        );

      } 
      setIsAdding(false);

    } catch (error) {
      setIsAdding(false);
      toastError('Oops Something Went Wrong.');
    }
  }

  const cancelOrder = async (orderId) => {
    try {
      setIsCancelling(true);
      const { status: cancelOrderStatus } = await OrdersService.cancelSellerOrder(orderId);
  
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

  const setOrderDelivered = async (orderId, body) => {
    try {
      setIsSettingDelivered(true);
      const { status: deliverOrderStatus } = await OrdersService.deliverOrder(orderId, body);
  
      if (deliverOrderStatus === 200) {
        toastSuccess('Order successfully delivered.');

        setOrders((prevOrders) =>
          prevOrders.filter((ord) => ord.id !== orderId)
        );

      } 
      setIsSettingDelivered(false);

    } catch (error) {
      setIsSettingDelivered(false);
      toastError('Oops Something Went Wrong.');
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const getSellerOrders = async () => {
      const { data: getSellerOrdersResponse } = await OrdersService.retrieveSellerOrders({
        status,
        search,
        productName,
        buyerName,
        sellerName,
        page,
        pageSize,
      });

      if (getSellerOrdersResponse) {
        setOrders(getSellerOrdersResponse.orders);
        setTotalPages(getSellerOrdersResponse.pageCount);
      }

      setIsLoading(false);
    };

    getSellerOrders();
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
    isAdding, 
    addDeliveryFee,
    isCancelling,
    cancelOrder, 
    setOrders,
    isSettingDelivered,
    setOrderDelivered,
  };
};

export default useSellerOrders;
