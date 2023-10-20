import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { ProductsService, ReportsService } from '@/services';

const useReportedProducts = ({page, pageSize}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reportedProducts, setReportedProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const deleteProduct = async (productId) => {
    try {
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

    } catch (error) {
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

    } catch (error) {
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
        // {page, pageSize}
      );

      if (getProductsReportResponse) {
        setReportedProducts(getProductsReportResponse);
        // setTotalPage(getProductsReportResponse.totalPage);
      }

      setIsLoading(false);
    };

    getProductsReports();
  }, []);

  return { isLoading, reportedProducts, totalPage, deleteProduct, resolveProductReports };
};

export default useReportedProducts;
