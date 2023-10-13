import { Card, Shine, Separator } from '@/components';

import styles from './styles.module.scss';


function PreloaderSellers() {
  return <Card className={styles.PreloaderSellers}>
    <div className={styles.PreloaderSellers_header}>
      <Shine className={styles.PreloaderSellers_header_shine} />
      <Shine className={styles.PreloaderSellers_header_shine} />
      <Shine className={styles.PreloaderSellers_header_shine} />
      <Shine className={styles.PreloaderSellers_header_shine} />
      <Shine className={styles.PreloaderSellers_header_shine} />
      <Shine className={styles.PreloaderSellers_header_shine} />
      <Shine className={styles.PreloaderSellers_header_shine} />
      <Shine className={styles.PreloaderSellers_header_shine} />
    </div>

    <Separator className={styles.PreloaderSellers_separator} />

    <div className={styles.PreloaderSellers_body}>
      <Shine className={styles.PreloaderSellers_body_shine} />
      <Shine className={styles.PreloaderSellers_body_shine} />
      <Shine className={styles.PreloaderSellers_body_shine} />
      <Shine className={styles.PreloaderSellers_body_shine} />
      <Shine className={styles.PreloaderSellers_body_shine} />
      <Shine className={styles.PreloaderSellers_body_shine} />
      <Shine className={styles.PreloaderSellers_body_shine} />
      <Shine className={styles.PreloaderSellers_body_shine} />
    </div>
  </Card>
}

export default PreloaderSellers;
