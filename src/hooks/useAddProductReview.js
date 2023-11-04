import { useState } from 'react';

import { ProductsService } from '@/services';

const useAddProductReview = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addProductReview = async (productId, body) => {
    setIsLoading(true);

    let responseCode;

    try {
      const response = await ProductsService.addReviews(productId, body);

      responseCode = response.status;
    } catch (error) {
      responseCode = error.response.status;
      setIsLoading(false);
    }

    setIsLoading(false);

    return { responseCode };
  };

  return { isLoading, addProductReview };
};

export default useAddProductReview;
