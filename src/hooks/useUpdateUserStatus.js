import { useState } from 'react';

import { userStatus } from '@/app-globals';
import { UsersService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useUpdateUserStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sellers, setSellers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const updateSellerStatus = async (userId, status) => {

    try {
      setIsLoading(true);

      const { status: updateSellerStatusStatus } = await UsersService.updateUserStatus(
        userId, { status }
      );

      if (updateSellerStatusStatus === 200) {
        if (status === userStatus.BANNED) {
          toastSuccess('Seller successfully banned.');
        }
  
        if (status === userStatus.ACTIVE) {
          toastSuccess('Seller successfully unbanned.');
        }
  
        // Update the seller isBanned status
        setSellers((prevSellers) =>
          prevSellers.map((prevSeller) => {
            if (prevSeller.id === userId) {
              return {
                ...prevSeller,
                isBanned: status === userStatus.BANNED,
              };
            }
  
            return prevSeller;
          })
        );
      }

      setIsLoading(false);
    } catch (error) {
      toastError('Oops Something Went Wrong.');
      setIsLoading(false);
    }
  };

  return { isLoading, updateSellerStatus };
};

export default useUpdateUserStatus;
