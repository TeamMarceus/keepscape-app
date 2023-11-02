import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ProductsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useProduct = (productId, isUpdatingProduct) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [product, setProduct] = useState(null);

  const deleteProduct = async () => {
    try {
      setIsDeleting(true);
      const { status: deleteProductStatus } = await ProductsService.delete(productId);
  
      if (deleteProductStatus === 200) {
        toastSuccess('Product successfully deleted.');
      } 
      setIsDeleting(false);
      router.push('/seller/products');

    } catch (error) {
      setIsDeleting(false);
      toastError('Oops Something Went Wrong.');
    }
  }

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
  }, [isUpdatingProduct]);

  return { isLoading, product, isDeleting, deleteProduct };
};

export default useProduct;
