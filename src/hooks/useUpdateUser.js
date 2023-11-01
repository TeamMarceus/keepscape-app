import { useState } from 'react';

import { UsersService } from '@/services';

const useUpdateUser = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateAccount = async (
    userType,
    userTobeUpdated,
  ) => {
    setIsUpdating(true);

    let responseCode;
    const errors = {};
    try {
      const response = await UsersService.updateAccount(userType, userTobeUpdated);
      
      responseCode = response.status;

      // if (responseCode === 200) {
      //   await UsersService.updateBuyerSuggestions();
      // }
    } catch (error) {
      responseCode = error.response.status;
    }

    setIsUpdating(false);

    return { responseCode, errors };
  };

  const updatePassword = async (body) => {
    setIsUpdating(true);

    let responseCode;
    const errors = {};
    try {
      const response = await UsersService.updatePassword(body);
      
      responseCode = response.status;
      setIsUpdating(false);
    } catch (error) {
      responseCode = error.response.status;
      const errorData = error.response.data;
      const errorsData = errorData.errors;

      if (errorsData?.NewPassword) {
        errors.newPassword =
        'New password must be different from old password.';
      } else if (errorsData?.OldPassword) {
        errors.oldPassword =
          'Old password is incorrect.';
      } else if (errorData.includes('Invalid email')) {
        errors.oldPassword =
          'Old password is incorrect.';
      }
      
      setIsUpdating(false);
    }

    return { responseCode, errors };
  };


  return { isUpdating, updateAccount, updatePassword };
};

export default useUpdateUser;
