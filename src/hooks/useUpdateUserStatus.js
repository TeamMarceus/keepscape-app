import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { userStatus } from '@/app-globals';
import { UsersService } from '@/services';

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
          toast.error('Seller successfully banned.', {
            style: {
              backgroundColor: '#ed5565',
              color: '#fff',
            },
          });
        }
  
        if (status === userStatus.ACTIVE) {
          toast.success('Seller successfully unbanned.', {
            style: {
              backgroundColor: '#1ab394',
              color: '#fff',
            },
          });
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
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });

      setIsLoading(false);
    }

  };


  return { isLoading, updateSellerStatus };
};

export default useUpdateUserStatus;
