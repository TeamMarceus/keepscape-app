import { useState, useEffect } from 'react';

import { ProductsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useSellerProducts = ({
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const deleteProduct = async (productId) => {
    try {
      setIsDeleting(true);
      const { status: deleteProductStatus } = await ProductsService.delete(productId);
  
      if (deleteProductStatus === 200) {
        toastSuccess('Product successfully deleted.');

        setProducts((prevProducts) =>
          prevProducts.filter((prod) => prod.id !== productId)
        );

      } 
      setIsDeleting(false);

    } catch (error) {
      setIsDeleting(false);
      toastError('Oops Something Went Wrong.');
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const getSellerProducts = async () => {
      const { data: getSellerProductsResponse } = await ProductsService.sellerProductList({
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

      if (getSellerProductsResponse) {
        setProducts(getSellerProductsResponse.products);
        setTotalPages(getSellerProductsResponse.pageCount);
      }

      setIsLoading(false);
    };

    getSellerProducts();
  }, [
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
    pageSize]);

  return { isLoading, products, totalPages, isDeleting, deleteProduct };
};

export default useSellerProducts;
