import { useState, useEffect } from 'react';

import { FinancesService } from '@/services';

const useSellerWithdrawals = ({page, pageSize}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [withdrawals, setWithdrawals] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getWithdrawals = async () => {
      setIsLoading(true);
      
      const { data: getWithdrawalsResponse } = await FinancesService.retriveSellerWithdrawals({
        page,
        pageSize,
      });

      if (getWithdrawalsResponse) {
        setWithdrawals(getWithdrawalsResponse.balanceWithdrawals);
        setTotalPages(getWithdrawalsResponse.pageCount);
      }

      setIsLoading(false);
    };

    getWithdrawals();
  }, [page, pageSize]);

  return { isLoading, withdrawals, totalPages };
};

export default useSellerWithdrawals;
