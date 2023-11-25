import { useState } from 'react';

import {
  buttonTypes,
  colorClasses,
  iconButtonTypes,
  textTypes,
} from '@/app-globals';
import { Button, Card, IconButton, Text } from '@/components';

import useAnnouncements from '@/hooks/useAnnouncements';

import AddAnnouncementModal from './AddAnnouncementModal';
import PreloaderAnnouncement from './Preloader';
import styles from './styles.module.scss';

function Announcements() {
  const [isAddAnnouncementModalOpen, setIsAddAnnouncementModalOpen] =
    useState(false);

  const {
    isLoading: isAnnouncementsLoading,
    announcements,
    totalPage,
    setAnnouncements,
    deleteAnnouncement,
  } = useAnnouncements({ page: 1, pageSize: 10 });

  return (
    <>
      <div className={styles.Announcements}>
        <Text type={textTypes.HEADING.XS}>Announcements</Text>

        <Button
          className={styles.Announcements_button}
          icon="add"
          onClick={() => setIsAddAnnouncementModalOpen(true)}
        >
          New Announcement
        </Button>

        {isAnnouncementsLoading ? (
          <PreloaderAnnouncement />
        ) : (
          <Card className={styles.Announcements_content}>
            {announcements.map((announcement, index) => (
              <div key={index} className={styles.Announcements_content_text}>
                <div className={styles.Announcements_content_title}>
                  <Text
                    colorClass={colorClasses.BLUE['400']}
                    type={textTypes.HEADING.XXS}
                  >
                    {announcement.title}
                  </Text>

                  <IconButton
                    icon="delete"
                    iconClassName={styles.Announcements_content_icon}
                    type={iconButtonTypes.ICON.MD}
                    onClick={() => deleteAnnouncement(announcement.id)}
                  />
                </div>

                <Text>{announcement.description}</Text>
              </div>
            ))}
          </Card>
        )}
      </div>

      {isAddAnnouncementModalOpen && (
        <AddAnnouncementModal
          handleClose={() => setIsAddAnnouncementModalOpen(false)}
          isOpen={isAddAnnouncementModalOpen}
          setAnnouncements={setAnnouncements}
        />
      )}
    </>
  );
}
export default Announcements;
