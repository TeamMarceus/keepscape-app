import { useEffect, useState } from 'react';

import { ProductsService } from '@/services';

const useProductPlaces = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productPlaces, setProductPlaces] = useState(null);

  useEffect(() => {
    const getProductPlaces = async () => {
      const { data: getProductPlacesResponse } = await ProductsService.retrievePlaces();

      if (getProductPlacesResponse) {
        setProductPlaces(getProductPlacesResponse);
      }

      setIsLoading(false);
    };

    getProductPlaces();
  }, []);

  return { isLoading, productPlaces };
};

export default useProductPlaces;
