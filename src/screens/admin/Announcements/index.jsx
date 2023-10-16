import { useState } from 'react';

import {
  buttonTypes,
  colorClasses,
  iconButtonTypes,
  textTypes,
} from '@/app-globals';
import { Button, Card, IconButton, Text } from '@/components';

import AddAnnouncementModal from './AddAnnouncementModal';
import styles from './styles.module.scss';

const announcements = [
  {
    title: 'Change of Terms and Conditions',
    text: 'Hey Keeypscape sellers! We have updated our terms and conditions. Please read them carefully before proceeding. The following changes have been made: 1. Sellers are now required to ship their orders within 3 days of receiving the order. 2. Sellers are now required to provide a tracking number for their orders. 3. Sellers are now required to provide a tracking number for their orders.',
  },
  {
    title: 'Change of Terms and Conditions',
    text: 'Hey Keeypscape sellers! We have updated our terms and conditions. Please read them carefully before proceeding. The following changes have been made: 1. Sellers are now required to ship their orders within 3 days of receiving the order. 2. Sellers are now required to provide a tracking number for their orders. 3. Sellers are now required to provide a tracking number for their orders.',
  },
  {
    title: 'Change of Terms and Conditions',
    text: 'Hey Keeypscape sellers! We have updated our terms and conditions. Please read them carefully before proceeding. The following changes have been made: 1. Sellers are now required to ship their orders within 3 days of receiving the order. 2. Sellers are now required to provide a tracking number for their orders. 3. Sellers are now required to provide a tracking number for their orders.',
  },
]

function Announcements() {
  const [isAddAnnouncementModalOpen, setIsAddAnnouncementModalOpen] = useState(false);

  return (
    <>
      <div className={styles.Announcements}>
        <Text type={textTypes.HEADING.XS}>
          Announcements
        </Text>

        <Button
          className={styles.Announcements_button}
          icon="add"
          onClick={() => setIsAddAnnouncementModalOpen(true)}
        >
          New Announcement
        </Button>
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
                />
              </div>

              <Text>
                {announcement.text}
              </Text>
            </div>
          ))}
        </Card>
      </div>

      {isAddAnnouncementModalOpen && (
        <AddAnnouncementModal
          handleClose={() => setIsAddAnnouncementModalOpen(false)}
          isOpen={isAddAnnouncementModalOpen}
        />
      )}
    </>
  )
}
export default Announcements;
