import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { userStatus } from '@/app-globals';
import { UsersService } from '@/services';

const useSellers = ({page, pageSize}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const updateSellerStatus = async (userId, status, reason) => {

    setIsUpdating(true);

    try {

      const { status: updateSellerStatusStatus } = await UsersService.updateUserStatus(
        userId, { status, reason }
      );
  
      if (updateSellerStatusStatus === 200) {
        if (status === userStatus.BANNED) {
          toast.success('Seller successfully banned.', {
            style: {
              backgroundColor: '#1ab394',
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

      setIsUpdating(false);

    } catch (error) {
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });

      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const getSellers = async () => {
      const { data: getSellersResponse } = await UsersService.retrieveSellers({
        page,
        pageSize
      });

      if (getSellersResponse) {
        setSellers(getSellersResponse.sellers);
        setTotalPages(getSellersResponse.pageCount);
      }

      setIsLoading(false);
    };

    getSellers();
  }, [page, pageSize]);

  return { isLoading, sellers, totalPages, isUpdating, updateSellerStatus };
};

export default useSellers;
