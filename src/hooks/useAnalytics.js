import { useState, useEffect } from 'react';

import { AnalyticsService } from '@/services';

const useAnalytics = (userType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const getAnalytics = async () => {
      const { data: getAnalyticsResponse } = await AnalyticsService.retrieve(
        userType
      );

      if (getAnalyticsResponse) {
        setAnalytics(getAnalyticsResponse);
      }

      setIsLoading(false);
    };

    if (userType) {
      getAnalytics();
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, analytics };
};

export default useAnalytics;
