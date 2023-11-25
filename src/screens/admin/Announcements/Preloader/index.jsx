import { Card, Shine } from '@/components';

import styles from './styles.module.scss';

function PreloaderAnnouncement() {
  return (
    <Card className={styles.PreloaderAnnouncement}>
      <div className={styles.PreloaderAnnouncement_header}>
        <Shine className={styles.PreloaderAnnouncement_header_shine} />
      </div>
    </Card>
  );
}

export default PreloaderAnnouncement;
