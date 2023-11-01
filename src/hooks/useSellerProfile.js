import { useState, useEffect } from 'react';

import { ProductsService } from '@/services';

const useSellerProfile = (sellerProfileId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sellerProfile, setSellerProfile] = useState(null);

  useEffect(() => {
    const getSellerProfile = async () => {
      const { data: getSellerProfileResponse } = await ProductsService.retrieveSellerProfile(
        sellerProfileId
      );

      if (getSellerProfileResponse) {
        setSellerProfile(getSellerProfileResponse);
      }

      setIsLoading(false);
    };

    getSellerProfile();
  }, []);

  return { isLoading, sellerProfile };
};

export default useSellerProfile;
