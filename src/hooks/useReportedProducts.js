import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { ProductsService, ReportsService } from '@/services';

const useReportedProducts = ({page, pageSize, sellerName, productName}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const [isResolvingLoading, setIsResolvingLoading] = useState(false);
  const [reportedProducts, setReportedProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const deleteProduct = async (productId) => {
    try {
      setIsDeletingLoading(true);
      const { status: deleteProductStatus } = await ProductsService.delete(productId);
  
      if (deleteProductStatus === 200) {
      
        toast.success('Product successfully deleted.', {
          style: {
            backgroundColor: '#1ab394',
            color: '#fff',
          },
        });
        
        setReportedProducts((prevReportedProducts) =>
          prevReportedProducts.filter((products) => products.id !== productId)
        );
      } 

      setIsDeletingLoading(false);
    } catch (error) {
      setIsDeletingLoading(false);
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });
    }
  };

  const resolveProductReports = async (productId) => {
    try {
      setIsResolvingLoading(true);
      const { status: resolveProductReportsStatus } = await ReportsService.resolveProductReports(productId);
  
      if (resolveProductReportsStatus === 200) {
        toast.success('Product reports resolved.', {
          style: {
            backgroundColor: '#1ab394',
            color: '#fff',
          },
        });
        
        setReportedProducts((prevReportedProducts) =>
          prevReportedProducts.filter((products) => products.id !== productId)
        );
      } 

      setIsResolvingLoading(false);
    } catch (error) {
      setIsResolvingLoading(false);
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });
    }
  };

  useEffect(() => {
    const getProductsReports = async () => {
      const { data: getProductsReportResponse } = await ReportsService.productList(
        {page, pageSize, sellerName, productName}
      );

      if (getProductsReportResponse) {
        setReportedProducts(getProductsReportResponse.products);
        setTotalPages(getProductsReportResponse.pageCount);
      }

      setIsLoading(false);
    };

    getProductsReports();
  }, [page, pageSize, sellerName, productName]);

  return {
    isLoading,
    isDeletingLoading,
    isResolvingLoading,
    reportedProducts, 
    totalPages, 
    deleteProduct, 
    resolveProductReports 
  };
};

export default useReportedProducts;
