import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import { textTypes } from '@/app-globals';

import Icon from '../Icon';
import RatingStars from '../RatingStars';
import Text from '../Text';

import styles from './styles.module.scss';

function ReviewCard({
  rating,
  comment,
  name,
  className,
}) {
  return (
    <div className={cn(styles.ReviewCard, className)}>
      <Icon className={styles.ReviewCard_icon} icon="account_circle"/>

      <div className={styles.ReviewCard_info}>
        <div className={styles.ReviewCard_info_user}>

          <Text
            className={styles.ReviewCard_info_name}
            type={textTypes.HEADING.XS}
          >
            {name}
          </Text>

          <RatingStars rating={rating} />
        </div>

        <div className={styles.ReviewCard_comment}>
          <Text>
            {comment}
          </Text>
        </div>
      </div>
    </div>
  )
}

ReviewCard.propTypes = {
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ReviewCard;

