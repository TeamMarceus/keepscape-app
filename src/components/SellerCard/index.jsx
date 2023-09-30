import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import { colorClasses, textTypes } from '@/app-globals';

import Card  from '../Card';
import Icon from '../Icon';
import RatingStars from '../RatingStars';
import Text from '../Text';

import styles from './styles.module.scss';


function SellerCard({
  name,
  description,
  rating,
  totalSold,
  email,
  contactNumber,
  className,
}) {
  return (
    <Card className={cn(styles.Seller, className)}>
      <div className={styles.Seller_info}>
        <div className={styles.Seller_name}>
          <Icon 
            className={styles.Seller_name_icon}
            icon="storefront" 
          />
          <Text
            type={textTypes.HEADING.XXS}
          >
            {name}
          </Text>
        </div>
        <Text colorClass={colorClasses.NEUTRAL['500']}> 
          Total Products Sold: {' '}
          <span className={styles.Seller_span}>{totalSold}</span> 
        </Text>
      </div>

      <RatingStars rating={rating} />


      <div className={styles.Seller_description}>
        <Text>
          {description}
        </Text>
      </div>

      <div className={styles.Seller_contacts}>
        <Text   
          colorClass={colorClasses.NEUTRAL['500']}
        > 
          Email: {email}
        </Text>
        <Text 
          colorClass={colorClasses.NEUTRAL['500']}
        > 
          Contact Number: {contactNumber}
        </Text>
      </div>
    </Card>
  )
}

SellerCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  totalSold: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default SellerCard;
