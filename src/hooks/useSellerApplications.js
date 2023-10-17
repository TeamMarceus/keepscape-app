import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { userStatus } from '@/app-globals';
import { UsersService } from '@/services';

const useSellerApplications = ({ page, pageSize }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sellerApplications, setSellerApplications] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const updateSellerApplication = async (sellerApplicationId, status) => {
    const { status: updateSellerApplicationStatus } = await UsersService.updateSellerApplication(
      sellerApplicationId, { status }
    );

    if (updateSellerApplicationStatus === 200) {
      if (status === userStatus.APPROVED) {
        toast.success('Seller Application Approved.', {
          style: {
            backgroundColor: '#1ab394',
            color: '#fff',
          },
        });
      }

      if (status === userStatus.REJECTED) {
        toast.error('Seller Application Rejected.', {
          style: {
            backgroundColor: '#ed5565',
            color: '#fff',
          },
        });
      }

      setSellerApplications((prevSellerApplications) =>
        prevSellerApplications.filter((prevSellerApplication) => prevSellerApplication.id !== sellerApplicationId)
      );

    } else {
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });
    }
  };

  useEffect(() => {
    const getSellerApplications = async () => {
      const { data: getSellerApplicationsResponse } = await UsersService.retrieveSellerApplications({status: 'Pending', page, pageSize});

      if (getSellerApplicationsResponse) {
        setSellerApplications(getSellerApplicationsResponse.sellerApplications);
        setTotalPages(getSellerApplicationsResponse.totalPages);
      }

      setIsLoading(false);
    };

    getSellerApplications();
  }, [page, pageSize]);

  return { isLoading, sellerApplications, totalPages, updateSellerApplication };
};

export default useSellerApplications;
