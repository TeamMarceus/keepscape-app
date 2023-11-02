import { useState } from 'react';

import { CartsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useAddToCart = () => {
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = async (product) => {
    setIsAdding(true);

    try {
      const { status: addToCartStatus } = await CartsService.add(product);

      if (addToCartStatus === 200) {
        toastSuccess('Product successfully added to cart.');
      } else {
        toastError('Oops Something Went Wrong.');
      }

      setIsAdding(false);
    } catch (error) {
      toastError('Oops Something Went Wrong.');
      
      setIsAdding(false);
    }
  };

  return { isAdding, addToCart };
};

export default useAddToCart;
