import { Card, Shine, Separator } from '@/components';

import styles from './styles.module.scss';

function PreloaderOrders() {
  return (
    <Card className={styles.PreloaderOrders}>
      <div className={styles.PreloaderOrders_header}>
        <Shine className={styles.PreloaderOrders_header_shine} />
        <Shine className={styles.PreloaderOrders_header_shine} />
        <Shine className={styles.PreloaderOrders_header_shine} />
        <Shine className={styles.PreloaderOrders_header_shine} />
        <Shine className={styles.PreloaderOrders_header_shine} />
        <Shine className={styles.PreloaderOrders_header_shine} />
      </div>

      <Separator className={styles.PreloaderOrders_separator} />

      <div className={styles.PreloaderOrders_body}>
        <Shine className={styles.PreloaderOrders_body_shine} />
        <Shine className={styles.PreloaderOrders_body_shine} />
        <Shine className={styles.PreloaderOrders_body_shine} />
        <Shine className={styles.PreloaderOrders_body_shine} />
        <Shine className={styles.PreloaderOrders_body_shine} />
        <Shine className={styles.PreloaderOrders_body_shine} />
      </div>
    </Card>
  );
}

export default PreloaderOrders;
