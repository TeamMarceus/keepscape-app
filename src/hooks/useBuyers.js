import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { userStatus } from '@/app-globals';
import { UsersService } from '@/services';

const useBuyers = ({page, pageSize}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const updateBuyerStatus = async (userId, status) => {

    setIsUpdating(true);

    try {
      const { status: updateBuyerStatusStatus } = await UsersService.updateUserStatus(
        userId, { status }
      );
  
      if (updateBuyerStatusStatus === 200) {
        if (status === userStatus.BANNED) {
          toast.success('Buyer successfully banned.', {
            style: {
              backgroundColor: '#1ab394',
              color: '#fff',
            },
          });
        }
  
        if (status === userStatus.ACTIVE) {
          toast.success('Buyer successfully unbanned.', {
            style: {
              backgroundColor: '#1ab394',
              color: '#fff',
            },
          });
        }
  
        // Update the seller isBanned status
        setBuyers((prevBuyers) =>
          prevBuyers.map((prevBuyer) => {
            if (prevBuyer.id === userId) {
              return {
                ...prevBuyer,
                isBanned: status === userStatus.BANNED,
              };
            }
  
            return prevBuyer;
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
    const getBuyers = async () => {
      const { data: getBuyersResponse } = await UsersService.retrieveBuyers({
        page,
        pageSize
      });

      if (getBuyersResponse) {
        setBuyers(getBuyersResponse.buyers);
        setTotalPages(getBuyersResponse.pageCount);
      }

      setIsLoading(false);
    };

    getBuyers();
  }, [page, pageSize]);

  return { isLoading, buyers, totalPages, isUpdating, updateBuyerStatus };
};

export default useBuyers;
