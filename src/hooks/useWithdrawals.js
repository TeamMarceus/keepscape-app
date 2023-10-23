import { useState, useEffect } from 'react';

import { FinancesService } from '@/services';

const useWithdrawals = ({page, pageSize, paymentMethod, paymentStatus, sellerName}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [withdrawals, setWithdrawals] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getSellers = async () => {
      setIsLoading(true);
      
      const { data: getSellersResponse } = await FinancesService.retrieveWithdrawals({
        page,
        pageSize,
        sellerName,
        paymentMethod,
        paymentStatus,
      });

      if (getSellersResponse) {
        setWithdrawals(getSellersResponse.balanceWithdrawals);
        setTotalPages(getSellersResponse.pageCount);
      }

      setIsLoading(false);
    };

    getSellers();
  }, [page, pageSize, paymentMethod, paymentStatus, sellerName]);

  return { isLoading, withdrawals, totalPages };
};

export default useWithdrawals;
