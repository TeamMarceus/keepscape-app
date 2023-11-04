import { useEffect, useState } from 'react';

import { ProductsService } from '@/services';

const useProductReview = (productId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [productReview, setProductReview] = useState(null);

  useEffect(() => {
    const getSuggestions = async () => {
      const { data: getProductReviewResponse } = await ProductsService.retrieveReview(
        productId
      );

      if (getProductReviewResponse) {
        setProductReview(getProductReviewResponse);
      }

      setIsLoading(false);
    };

    getSuggestions();
  }, [productId]);

  return { isLoading, productReview };
};

export default useProductReview;
