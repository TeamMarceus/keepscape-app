import { Card, Shine, Separator } from '@/components';

import styles from './styles.module.scss';


function PreloaderProductReviews() {
  return <Card className={styles.PreloaderProductReviews}>
    <div className={styles.PreloaderProductReviews_header}>
      <Shine className={styles.PreloaderProductReviews_header_shine} />
    </div>
  </Card>
}

export default PreloaderProductReviews;
