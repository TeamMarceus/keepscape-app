import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { ProductsService } from '@/services';

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
      
        toast.success('Product successfully deleted.', {
          style: {
            backgroundColor: '#1ab394',
            color: '#fff',
          },
        });

        setProducts((prevProducts) =>
          prevProducts.filter((prod) => prod.id !== productId)
        );

      } 
      setIsDeleting(false);

    } catch (error) {
      setIsDeleting(false);
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });
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
