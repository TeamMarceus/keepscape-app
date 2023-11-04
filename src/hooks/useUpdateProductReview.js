import { useState } from 'react';

import { ProductsService } from '@/services';

const useUpdateProductReview = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateProductReview = async (productId, body) => {
    setIsLoading(true);

    let responseCode;

    try {
      const response = await ProductsService.updateReview(productId, body);

      responseCode = response.status;
    } catch (error) {
      responseCode = error.response.status;
      setIsLoading(false);
    }

    setIsLoading(false);

    return { responseCode };
  };

  return { isLoading, updateProductReview };
};

export default useUpdateProductReview;
