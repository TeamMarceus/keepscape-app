import { useState } from 'react';

import { FinancesService } from '@/services';

const useRequestWithdraw = () => {
  const [isRequesting, setIsRequesting] = useState(false);

  const requestWithdraw = async (request) => {
    setIsRequesting(true);

    let responseCode;

    try {
      const response = await FinancesService.requestWithdraw(request);

      responseCode = response.status;
    } catch (error) {
      responseCode = error.response.status;
      setIsRequesting(false);
    }

    setIsRequesting(false);

    return { responseCode };
  };

  return { isRequesting, requestWithdraw };
};

export default useRequestWithdraw;
