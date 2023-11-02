import { useState } from 'react';

import { ProductsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useUpdateProduct = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const updateProduct = async ({productId, body, isHide, isUnhide}) => {
    let responseCode;

    try {
      setIsUpdating(true);

      const response = await ProductsService.update(productId, body);
      responseCode = response.status;

      if (responseCode === 200) {
        if (isHide) {
          toastSuccess('Product successfully hidden.');
        } else if (isUnhide) {
          toastSuccess('Product successfully unhidden.');
        }
      }

      setIsUpdating(false);
    } catch (error) {
      toastError('Oops Something Went Wrong.');

      responseCode = error.response.status;
      setIsUpdating(false);
    }

    return { responseCode };
  };


  return { isUpdating, updateProduct };
};

export default useUpdateProduct;
