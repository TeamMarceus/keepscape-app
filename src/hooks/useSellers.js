import { useState, useEffect } from 'react';

import { userStatus } from '@/app-globals';
import { UsersService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useSellers = ({page, pageSize, isBanned, search, sellerId}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState({});
  const [totalPages, setTotalPages] = useState(0);

  const updateSellerStatus = async (userId, status, reason) => {
    setIsUpdating(true);

    try {

      const { status: updateSellerStatusStatus } = await UsersService.updateUserStatus(
        userId, { status, reason }
      );
  
      if (updateSellerStatusStatus === 200) {
        if (status === userStatus.BANNED) {
          toastSuccess('Seller successfully banned.');
        }
  
        if (status === userStatus.ACTIVE) {
          toastSuccess('Seller successfully unbanned.');
        }
  
        // Update the seller that will remove it from the list
        setSellers((prevSellers) =>
          prevSellers.filter((s) => s.id !== userId)
        );
      } 

      setIsUpdating(false);

    } catch (error) {
      toastError('Oops Something Went Wrong.');
    
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const getSellers = async () => {
      setIsLoading(true);
      
      const { data: getSellersResponse } = await UsersService.retrieveSellers({
        page,
        pageSize,
        userId: sellerId,
        isBanned,
        search,
      });

      if (getSellersResponse) {
        setSellers(getSellersResponse.sellers);
        setTotalPages(getSellersResponse.pageCount);
      }

      if (getSellersResponse && sellerId) {
        setSeller(getSellersResponse);
      }

      setIsLoading(false);
    };

    getSellers();
  }, [page, pageSize, isBanned, search, sellerId]);

  return { isLoading, sellers, seller, totalPages, isUpdating, updateSellerStatus };
};

export default useSellers;
