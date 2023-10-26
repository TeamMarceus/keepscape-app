import { useState, useEffect } from 'react';

import { FinancesService } from '@/services';

const useSellerLogs = ({page, pageSize}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getLogs = async () => {
      setIsLoading(true);
      
      const { data: getLogsResponse } = await FinancesService.retrieveSellerLogs({
        page,
        pageSize,
      });

      if (getLogsResponse) {
        setLogs(getLogsResponse.logs);
        setTotalPages(getLogsResponse.pageCount);
      }

      setIsLoading(false);
    };

    getLogs();
  }, [page, pageSize]);

  return { isLoading, logs, totalPages };
};

export default useSellerLogs;
