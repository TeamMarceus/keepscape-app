import { Card, Shine } from '@/components';

import styles from './styles.module.scss';


function PreloaderSellerProfile() {
  return <Card className={styles.PreloaderSellerProfile}>
    <div className={styles.PreloaderSellerProfile_header}>
      <Shine className={styles.PreloaderSellerProfile_header_shine} />
    </div>
  </Card>
}

export default PreloaderSellerProfile;
