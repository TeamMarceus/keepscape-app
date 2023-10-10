import { Card, Shine, Separator } from '@/components';

import styles from './styles.module.scss';


function PreloaderProducts() {
  return <Card className={styles.PreloaderProducts}>
    <div className={styles.PreloaderProducts_header}>
      <Shine className={styles.PreloaderProducts_header_shine} />
      <Shine className={styles.PreloaderProducts_header_shine} />
      <Shine className={styles.PreloaderProducts_header_shine} />
      <Shine className={styles.PreloaderProducts_header_shine} />
      <Shine className={styles.PreloaderProducts_header_shine} />
      <Shine className={styles.PreloaderProducts_header_shine} />
      <Shine className={styles.PreloaderProducts_header_shine} />
    </div>

    <Separator className={styles.PreloaderProducts_separator} />

    <div className={styles.PreloaderProducts_body}>
      <Shine className={styles.PreloaderProducts_body_shine} />
      <Shine className={styles.PreloaderProducts_body_shine} />
      <Shine className={styles.PreloaderProducts_body_shine} />
      <Shine className={styles.PreloaderProducts_body_shine} />
      <Shine className={styles.PreloaderProducts_body_shine} />
      <Shine className={styles.PreloaderProducts_body_shine} />
      <Shine className={styles.PreloaderProducts_body_shine} />
    </div>
  </Card>
}

export default PreloaderProducts;
