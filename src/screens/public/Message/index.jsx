import React from 'react';

import { colorClasses, textTypes } from '@/app-globals';
import { ButtonLink, Text } from '@/components';

import styles from './styles.module.scss';

function Message() {
  return (
    <div className={styles.Message}>
      
      <div className={styles.Message_content}>

        <Text 
         className={styles.Message_content_title}
         colorClass={colorClasses.NEUTRAL['0']}
         type={textTypes.HEADING.MD}
        >
          NEGROS ORIENTAL
        </Text>

        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid amet quam nihil ab ad debitis commodi dolores sed, dolorem unde sapiente, quo molestias exercitationem a laudantium! Dolorum aspernatur at repudiandae?
        </Text>

        <ButtonLink
          className={styles.Message_button}
          icon='login'
          to="/keepscape"
        >
          Visit Keepscape
        </ButtonLink>
      </div>

      <div className={styles.Message_images}>
        img
      </div>
     
      
    </div>
  )
}

export default Message;
