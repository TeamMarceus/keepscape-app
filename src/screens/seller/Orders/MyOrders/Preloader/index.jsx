import { Card, Shine, Separator } from '@/components';

import styles from './styles.module.scss';


function PreloaderMyOrders() {
  return <Card className={styles.PreloaderMyOrders}>
    <div className={styles.PreloaderMyOrders_header}>
      <Shine className={styles.PreloaderMyOrders_header_shine} />
      <Shine className={styles.PreloaderMyOrders_header_shine} />
      <Shine className={styles.PreloaderMyOrders_header_shine} />
      <Shine className={styles.PreloaderMyOrders_header_shine} />
      <Shine className={styles.PreloaderMyOrders_header_shine} />
      <Shine className={styles.PreloaderMyOrders_header_shine} />
    </div>

    <Separator className={styles.PreloaderMyOrders_separator} />

    <div className={styles.PreloaderMyOrders_body}>
      <Shine className={styles.PreloaderMyOrders_body_shine} />
      <Shine className={styles.PreloaderMyOrders_body_shine} />
      <Shine className={styles.PreloaderMyOrders_body_shine} />
      <Shine className={styles.PreloaderMyOrders_body_shine} />
      <Shine className={styles.PreloaderMyOrders_body_shine} />
      <Shine className={styles.PreloaderMyOrders_body_shine} />
    </div>
  </Card>
}

export default PreloaderMyOrders;
