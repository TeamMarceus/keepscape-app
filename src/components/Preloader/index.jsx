import React from 'react';

import Spinner from '../Spinner';

import styles from './styles.module.scss';

function Preloader() {
  return (
    <div className={styles.loader}>
      <Spinner />
    </div>
  );
}

export default Preloader;
