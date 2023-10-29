import { useState, useEffect } from 'react';

import { ProductsService } from '@/services';

const useProducts = ({
  sellerProfileId,
  search,
  provinces, 
  categories,  
  rating, 
  minPrice, 
  maxPrice, 
  isHidden,
  isDescending, 
  page, 
  pageSize
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true)
    const getProducts = async () => {
      const { data: getProductsResponse } = await ProductsService.productList({
        sellerProfileId,
        search,
        provinces,
        categories,
        rating,
        minPrice,
        maxPrice,
        isHidden,
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
  }, [
    sellerProfileId,
    search, 
    provinces?.length,
    categories?.length,
    rating, 
    minPrice, 
    maxPrice, 
    isHidden,
    isDescending, 
    page, 
    pageSize
  ]);

  return { isLoading, products, totalPages };
};

export default useProducts;
