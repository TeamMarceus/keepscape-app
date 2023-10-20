import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { AnnouncementsService } from '@/services';

const useAnnouncements = ({page, pageSize}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const deleteAnnouncement = async (announcementId) => {
    const { status: deleteAnnouncementStatus } = await AnnouncementsService.delete(
      announcementId
    );

    if (deleteAnnouncementStatus === 200) {
      toast.success('Announcement successfully deleted.', {
        style: {
          backgroundColor: '#1ab394',
          color: '#fff',
        },
      });

      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter((prevAnnouncement) => prevAnnouncement.id !== announcementId)
      );
    } else {
      toast.error('Oops Something Went Wrong.', {
        style: {
          backgroundColor: '#ed5565',
          color: '#fff',
        },
      });
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
