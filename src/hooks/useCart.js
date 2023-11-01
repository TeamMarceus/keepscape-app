import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { CartsService } from '@/services';

const useCart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cart, setCart] = useState(null);

  const deleteCartItems = async (itemIds) => {
    try {
      setIsDeleting(true);
      const { status: deleteCartItemStatus } = await CartsService.deleteCart(itemIds);
  
      if (deleteCartItemStatus === 200) {
        toast.success(itemIds.length > 1 ? 'Items successfully deleted' : 'Item successfully deleted', {
          style: {
            backgroundColor: '#1ab394',
            color: '#fff',
          },
        });
      } 

      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });
    }
  }

  useEffect(() => {
    const getCart = async () => {
      const { data: getCartResponse } = await CartsService.retrieve();

      if (getCartResponse) {
        setCart(getCartResponse);
      }

      setIsLoading(false);
    };

    getCart();
  }, []);

  return { isLoading, cart, isDeleting, deleteCartItems };
};

export default useCart;
