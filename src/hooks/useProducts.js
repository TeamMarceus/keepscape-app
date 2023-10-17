import { useState, useEffect } from 'react';

import { ProductsService } from '@/services';

const useProducts = ({search, province, category, sellerId, rating, minPrice, maxPrice, isDescending, page, pageSize}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const { data: getProductsResponse } = await ProductsService.filterList({
        search,
        province,
        category,
        sellerId,
        rating,
        minPrice,
        maxPrice,
        page,
        pageSize,
        descending: isDescending,
      });

      if (getProductsResponse) {
        setProducts(getProductsResponse.products);
        setTotalPages(getProductsResponse.pageCount);
      }

      setIsLoading(false);
    };

    getProducts();
  }, [search, province, category, sellerId, rating, minPrice, maxPrice, isDescending, page, pageSize]);

  return { isLoading, products, totalPages };
};

export default useProducts;
