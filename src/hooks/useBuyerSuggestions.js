import { useState, useEffect } from 'react';

import { UsersService } from '@/services';

const useBuyerSuggestions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [buyerSuggestions, setBuyerSuggestions] = useState([]);

  useEffect(() => {
    const getBuyerSuggestions = async () => {
      const { data: getBuyerSuggestionsResponse } = await UsersService.retrieveBuyerSuggestions();

      if (getBuyerSuggestionsResponse) {
        setBuyerSuggestions(getBuyerSuggestionsResponse);
      }

      setIsLoading(false);
    };

    getBuyerSuggestions();
  }, []);

  return { isLoading, buyerSuggestions };
};

export default useBuyerSuggestions;
