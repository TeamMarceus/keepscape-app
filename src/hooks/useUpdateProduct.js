import { useState } from 'react';

import { toast } from 'sonner';

import { ProductsService } from '@/services';

const useUpdateProduct = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const updateProduct = async (productId, body, isHide, isUnhide) => {
    let responseCode;

    try {
      setIsUpdating(true);

      const response = await ProductsService.update(productId, body);
      responseCode = response.status;

      if (responseCode === 200) {
        if (isHide) {
          toast.success('Product successfully hidden.', {
            style: {
              backgroundColor: '#1ab394',
              color: '#fff',
            },
          });
        } else if (isUnhide) {
          toast.success('Product successfully unhidden.', {
            style: {
              backgroundColor: '#1ab394',
              color: '#fff',
            },
          });
        }
      }

      setIsUpdating(false);
    } catch (error) {
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });

      responseCode = error.response.status;
      setIsUpdating(false);
    }

    return { responseCode };
  };


  return { isUpdating, updateProduct };
};

export default useUpdateProduct;
