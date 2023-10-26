import { useState, useEffect } from 'react';

import { ProductsService } from '@/services';

const useProductReviews = ({
  productId,
  stars,
  page, 
  pageSize,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true)
    const getProductReviews = async () => {
      const { data: getProductReviewsResponse } = await ProductsService.reviews(productId, {
        stars,
        page,
        pageSize,

      });

      if (getProductReviewsResponse) {
        setReviews(getProductReviewsResponse.reviews);
        setTotalPages(getProductReviewsResponse.pageCount);
      }

      setIsLoading(false);
    };

    getProductReviews();
  }, [productId, stars, page, pageSize]);

  return { isLoading, reviews, totalPages };
};

export default useProductReviews;
