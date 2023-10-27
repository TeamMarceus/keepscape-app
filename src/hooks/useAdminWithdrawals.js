import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { FinancesService } from '@/services';

const useAdminWithdrawals = ({page, pageSize, paymentMethod, paymentStatus, sellerName, search}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const updateWithdrawal = async ({balanceWithdrawalId, status, reason, paymentProofImage}) => {
    setIsUpdating(true);

    try {
      const { status: updateWithdrawalStatusResponse } = await FinancesService.updateWithdrawal(
        balanceWithdrawalId, { status, reason, paymentProofImage }
      );
  
      if (updateWithdrawalStatusResponse === 200) {
        if (status === 'Paid') {
          toast.success('Balance successfully transferred.', {
            style: {
              backgroundColor: '#1ab394',
              color: '#fff',
            },
          });
        }
  
        if (status === 'Rejected') {
          toast.success('Request successfully rejected.', {
            style: {
              backgroundColor: '#1ab394',
              color: '#fff',
            },
          });
        }
  
       setWithdrawals((prevWithdrawals) =>
        prevWithdrawals.filter((withdrawal) => withdrawal.id !== balanceWithdrawalId)
      );
    
      } 

      setIsUpdating(false);
    } catch (error) {
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });
      
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const getWithdrawals = async () => {
      setIsLoading(true);
      
      const { data: getWithdrawalsResponse } = await FinancesService.retrieveAdminWithdrawals({
        page,
        pageSize,
        sellerName: search,
        paymentMethod: search,
        paymentStatus,
      });

      if (getWithdrawalsResponse) {
        setWithdrawals(getWithdrawalsResponse.balanceWithdrawals);
        setTotalPages(getWithdrawalsResponse.pageCount);
      }

      setIsLoading(false);
    };

    getWithdrawals();
  }, [page, pageSize, paymentMethod, paymentStatus, sellerName, search]);

  return { isLoading, withdrawals, totalPages, isUpdating, updateWithdrawal };
};

export default useAdminWithdrawals;
