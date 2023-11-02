import { useState, useEffect } from 'react';

import { AnnouncementsService } from '@/services';
import { toastError, toastSuccess } from '@/utils/toasts';

const useAnnouncements = ({page, pageSize}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const deleteAnnouncement = async (announcementId) => {
    try {
      const { status: deleteAnnouncementStatus } = await AnnouncementsService.delete(
        announcementId
      );
  
      if (deleteAnnouncementStatus === 200) {
        toastSuccess('Announcement successfully deleted.');
  
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.filter((prevAnnouncement) => prevAnnouncement.id !== announcementId)
        );
      } else {
        toastError('Oops Something Went Wrong.');
      }
    } catch (error) {
      toastError('Oops Something Went Wrong.');
    }
  };

  useEffect(() => {
    const getAnnouncements = async () => {
      const { data: getAnnouncementsResponse } = await AnnouncementsService.list(
        // {page, pageSize}
      );

      if (getAnnouncementsResponse) {
        setAnnouncements(getAnnouncementsResponse.announcements);
        setTotalPage(getAnnouncementsResponse.totalPage);
      }

      setIsLoading(false);
    };

    getAnnouncements();
  }, []);

  return { isLoading, announcements, totalPage, setAnnouncements, deleteAnnouncement };
};

export default useAnnouncements;
