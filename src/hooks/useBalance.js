import { useState, useEffect } from 'react';

import { FinancesService } from '@/services';

const useBalance = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    const getWithdrawals = async () => {
      setIsLoading(true);
      
      const { data: getWithdrawalsResponse } = await FinancesService.retrieveBalance();

      if (getWithdrawalsResponse) {
        setBalance(getWithdrawalsResponse);
      }

      setIsLoading(false);
    };

    getWithdrawals();
  }, []);

  return { isLoading, balance };
};

export default useBalance;
