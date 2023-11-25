import { Card, Shine, Separator } from '@/components';

import styles from './styles.module.scss';

function PreloaderBuyers() {
  return (
    <Card className={styles.PreloaderBuyers}>
      <div className={styles.PreloaderBuyers_header}>
        <Shine className={styles.PreloaderBuyers_header_shine} />
        <Shine className={styles.PreloaderBuyers_header_shine} />
        <Shine className={styles.PreloaderBuyers_header_shine} />
        <Shine className={styles.PreloaderBuyers_header_shine} />
        <Shine className={styles.PreloaderBuyers_header_shine} />
        <Shine className={styles.PreloaderBuyers_header_shine} />
      </div>

      <Separator className={styles.PreloaderBuyers_separator} />

      <div className={styles.PreloaderBuyers_body}>
        <Shine className={styles.PreloaderBuyers_body_shine} />
        <Shine className={styles.PreloaderBuyers_body_shine} />
        <Shine className={styles.PreloaderBuyers_body_shine} />
        <Shine className={styles.PreloaderBuyers_body_shine} />
        <Shine className={styles.PreloaderBuyers_body_shine} />
        <Shine className={styles.PreloaderBuyers_body_shine} />
      </div>
    </Card>
  );
}

export default PreloaderBuyers;
