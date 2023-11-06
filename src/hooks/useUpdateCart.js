import { useState } from 'react';

import { CartsService } from '@/services';

const useUpdateCart = () => {

  const [isUpdating, setIsUpdating] = useState(false);

  const updateCart = async (cart) => {
    setIsUpdating(true);

    let responsCode;

    try {
      const { status: updateCartStatus } = await CartsService.update(cart);

      responsCode = updateCartStatus;

      setIsUpdating(false);
    } catch (error) {
      responsCode = error.response.status;

      setIsUpdating(false);
    }

    return { responsCode };
  };

  return { isUpdating, updateCart };
};

export default useUpdateCart;
