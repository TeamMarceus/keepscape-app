import React from 'react';

import cn from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';

import NoResult from '%/images/Misc/no-results.webp';

import { colorClasses, textTypes } from '@/app-globals';
import Text from '@/components/Text';

import styles from './styles.module.scss';

function NoResults({
  className,
  message,
}) {
  return (
    <div className={cn(styles.NoResults, className)}>
      <Image
        alt="No Purchase"
        className={styles.NoResults_image}
        src={NoResult}
        width={500}
      />
      
      <Text
        className={styles.NoResults_text}
        colorClass={colorClasses.NEUTRAL['400']}
        type={textTypes.HEADING.SM}
      >
        {message}
      </Text>
    </div>
  )
}

NoResults.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
}

export default NoResults
