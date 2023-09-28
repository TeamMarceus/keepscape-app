import React from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import Icon from '../Icon'

import styles from './styles.module.scss'

function RatingStars({rating, className = null}) {
  return (
    <div className={cn(styles.RatingStars, className)}>
      {Array.from({ length: rating }, (_, index) => (
        <Icon 
          key={index}
          className={styles.RatingStars_icon}
          icon="star"
        />
      ))}
      
      {Array.from({ length: 5 - rating }, (_, index) => (
        <Icon 
          key={index}
          className={cn(styles.RatingStars_icon)}
          icon="grade"
        />
      ))}
    </div>
  )
}

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  className: PropTypes.string,
}

export default RatingStars
