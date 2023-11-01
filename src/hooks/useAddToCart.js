import { useState } from 'react';

import { toast } from 'sonner';

import { CartsService } from '@/services';

const useAddToCart = () => {
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = async (product) => {
    setIsAdding(true);

    try {
      const { status: addToCartStatus } = await CartsService.add(product);

      if (addToCartStatus === 200) {
        toast.success('Product successfully added to cart.', {
          style: {
            backgroundColor: '#1ab394',
            color: '#fff',
          },
        });
      } else {
        toast.error('Oops Something Went Wrong.', {
          style: {
            backgroundColor: '#ed5565',
            color: '#fff',
          },
        });
      }

      setIsAdding(false);
    } catch (error) {
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });
      
      setIsAdding(false);
    }
  };

  return { isAdding, addToCart };
};

export default useAddToCart;
