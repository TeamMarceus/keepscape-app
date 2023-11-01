import React from 'react';

import { ButtonLink } from '@/components';

import styles from './styles.module.scss';

function Message() {
  return (
    <div className={styles.Message}>
      Message

      <ButtonLink
        className={styles.Message_button}
        to="/keepscape"
      >
        Visit Keepscape
      </ButtonLink>
      
    </div>
  )
}

export default Message;
