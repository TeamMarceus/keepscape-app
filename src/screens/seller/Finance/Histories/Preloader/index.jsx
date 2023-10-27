import { Card, Shine, Separator } from '@/components';

import styles from './styles.module.scss';


function PreloaderFinance() {
  return <Card className={styles.PreloaderFinance}>
    <div className={styles.PreloaderFinance_header}>
      <Shine className={styles.PreloaderFinance_header_shine} />
      <Shine className={styles.PreloaderFinance_header_shine} />
      <Shine className={styles.PreloaderFinance_header_shine} />
      
    </div>

    <Separator className={styles.PreloaderFinance_separator} />

    <div className={styles.PreloaderFinance_body}>
      <Shine className={styles.PreloaderFinance_body_shine} />
      <Shine className={styles.PreloaderFinance_body_shine} />
      <Shine className={styles.PreloaderFinance_body_shine} />
    </div>
  </Card>
}

export default PreloaderFinance;
