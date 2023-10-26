import { useState } from 'react';

import { ProductsService } from '@/services';

const useAddProduct = () => {
  const [isAdding, setIsAdding] = useState(false);

  const addProduct = async (product) => {
    setIsAdding(true);

    let responseCode;

    try {
      const response = await ProductsService.add(product);

      responseCode = response.status;
    } catch (error) {
      responseCode = error.response.status;
      setIsAdding(false);
    }

    setIsAdding(false);

    return { responseCode };
  };

  return { isAdding, addProduct };
};

export default useAddProduct;
