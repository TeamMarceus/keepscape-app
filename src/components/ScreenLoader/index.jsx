import React from 'react';

import Spinner from '../Spinner';

import styles from './styles.module.scss';

function ScreenLoader() {
  return (
    <div className={styles.loader}>
      <Spinner />
    </div>
  );
}

export default ScreenLoader;
