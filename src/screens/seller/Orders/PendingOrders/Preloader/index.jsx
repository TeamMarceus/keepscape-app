import { Card, Shine, Separator } from '@/components';

import styles from './styles.module.scss';


function PreloaderPendingOrders() {
  return <Card className={styles.PreloaderPendingOrders}>
    <div className={styles.PreloaderPendingOrders_header}>
      <Shine className={styles.PreloaderPendingOrders_header_shine} />
      <Shine className={styles.PreloaderPendingOrders_header_shine} />
      <Shine className={styles.PreloaderPendingOrders_header_shine} />
      <Shine className={styles.PreloaderPendingOrders_header_shine} />
      <Shine className={styles.PreloaderPendingOrders_header_shine} />
      <Shine className={styles.PreloaderPendingOrders_header_shine} />
    </div>

    <Separator className={styles.PreloaderPendingOrders_separator} />

    <div className={styles.PreloaderPendingOrders_body}>
      <Shine className={styles.PreloaderPendingOrders_body_shine} />
      <Shine className={styles.PreloaderPendingOrders_body_shine} />
      <Shine className={styles.PreloaderPendingOrders_body_shine} />
      <Shine className={styles.PreloaderPendingOrders_body_shine} />
      <Shine className={styles.PreloaderPendingOrders_body_shine} />
      <Shine className={styles.PreloaderPendingOrders_body_shine} />
    </div>
  </Card>
}

export default PreloaderPendingOrders;
