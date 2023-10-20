import { useState } from 'react';

import { AnnouncementsService } from '@/services';

const useAddAnnouncement = () => {
  const [isAdding, setIsAdding] = useState(false);

  const addAnnouncement = async (announcement) => {
    setIsAdding(true);

    let responseCode;
    let data;

    try {
      const response = await AnnouncementsService.add(announcement);

      responseCode = response.status;
      data = response.data;
    } catch (error) {
      responseCode = error.response.status;
    }

    setIsAdding(false);

    return { responseCode, data };
  };

  return { isAdding, addAnnouncement };
};

export default useAddAnnouncement;
