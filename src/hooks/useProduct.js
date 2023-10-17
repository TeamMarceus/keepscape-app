import { useState, useEffect } from 'react';

import { ProductsService } from '@/services';

const useProduct = (productId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const { data: getProductResponse } = await ProductsService.retrieve(
        productId
      );

      if (getProductResponse) {
        setProduct(getProductResponse);
      }

      setIsLoading(false);
    };

    if (productId) {
      getProduct();
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, product };
};

export default useProduct;
