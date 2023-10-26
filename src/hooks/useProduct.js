import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ProductsService } from '@/services';

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
      
        toast.success('Product successfully deleted.', {
          style: {
            backgroundColor: '#1ab394',
            color: '#fff',
          },
        });
      } 
      setIsDeleting(false);
      router.push('/seller/products');

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
