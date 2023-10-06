import { Card, Shine, Separator } from '@/components';

import styles from './styles.module.scss';


function PreloaderOnGoingOrders() {
  return <Card className={styles.PreloaderOnGoingOrders}>
    <div className={styles.PreloaderOnGoingOrders_header}>
      <Shine className={styles.PreloaderOnGoingOrders_header_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_header_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_header_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_header_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_header_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_header_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_header_shine} />
    </div>

    <Separator className={styles.PreloaderOnGoingOrders_separator} />

    <div className={styles.PreloaderOnGoingOrders_body}>
      <Shine className={styles.PreloaderOnGoingOrders_body_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_body_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_body_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_body_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_body_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_body_shine} />
      <Shine className={styles.PreloaderOnGoingOrders_body_shine} />
    </div>
  </Card>
}

export default PreloaderOnGoingOrders;
