import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { userStatus } from '@/app-globals';
import { UsersService } from '@/services';

const useBuyers = ({page, pageSize, isBanned, search, buyerId}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const [buyer, setBuyer] = useState({});
  const [totalPages, setTotalPages] = useState(0);

  const updateBuyerStatus = async (userId, status, reason) => {

    setIsUpdating(true);

    try {
      const { status: updateBuyerStatusStatus } = await UsersService.updateUserStatus(
        userId, { status, reason }
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
  
       // Update the seller that will remove it from the list
      setBuyers((prevBuyers) =>
        prevBuyers.filter((b) => b.id !== userId)
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
    setIsLoading(true);
    const getBuyers = async () => {
      const { data: getBuyersResponse } = await UsersService.retrieveBuyers({
        page,
        pageSize,
        isBanned,
        search,
        userId: buyerId,
      });

      if (getBuyersResponse) {
        setBuyers(getBuyersResponse.buyers);
        setTotalPages(getBuyersResponse.pageCount);
      }

      if (getBuyersResponse && buyerId) {
        setBuyer(getBuyersResponse);
      }

      setIsLoading(false);
    };

    getBuyers();
  }, [page, pageSize, isBanned, search, buyerId]);

  return { isLoading, buyers, buyer, totalPages, isUpdating, updateBuyerStatus };
};

export default useBuyers;
