import cn from 'classnames';
import PropTypes from 'prop-types';

import { colorClasses, textTypes } from '@/app-globals';
import { Card, RatingStars, Text} from '@/components';

import styles from './styles.module.scss';

function ProductCard({
  className = null,
  image = null,
  name,
  price = null,
  isClickable = false,
  rating,
  place,
  onClick = () => {},
}) {
  return (
    <Card 
      className={cn(
        styles.ProductCard, 
        className
      )}
      isClickable={isClickable}
      onClick={onClick}
    >

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        alt={name}
        className={styles.ProductCard_image}
        src={image}
      />
  
      <div className={styles.ProductCard_info}>
        {name}

        <Text
          className={styles.ProductCard_price}
          colorClass={colorClasses.RED['200']}
          type={textTypes.BODY.LG}
        >
          {`₱ ${price}`}
        </Text>

        <RatingStars className={styles.ProductCard_ratings} rating={rating}/>
        
        <Text
          colorClass={colorClasses.NEUTRAL['400']}
          type={textTypes.BODY.XS}
        >
          {place}
        </Text>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  className: PropTypes.string,
  image: PropTypes.any,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isClickable: PropTypes.bool,
  rating: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ProductCard;