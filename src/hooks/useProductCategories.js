import { useEffect, useState } from 'react';

import { ProductsService } from '@/services';

const useProductCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productCategories, setProductCategories] = useState(null);

  useEffect(() => {
    const getProductCategories = async () => {
      const { data: getProductCategoriesResponse } = await ProductsService.retrieveCategories();

      if (getProductCategoriesResponse) {
        setProductCategories(getProductCategoriesResponse);
      }

      setIsLoading(false);
    };

    getProductCategories();
  }, []);

  return { isLoading, productCategories };
};

export default useProductCategories;
