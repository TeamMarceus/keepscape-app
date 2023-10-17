import cn from 'classnames';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

import { colorClasses, textTypes } from '@/app-globals';
import { Button, Card, RatingStars, Text} from '@/components';

import styles from './styles.module.scss';

function ProductCard({
  className = null,
  image = null,
  name,
  price = null,
  isClickable = false,
  rating,
  place,
  id,
  userId = null,
}) {
  const router = useRouter();

  return (
    <Card 
      className={cn(
        styles.ProductCard, 
        className
      )}
      isClickable={isClickable}
      onClick={() => {
          router.push(`/buyer/product/${id}`);
      }}
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
        
        <div className={styles.ProductCard_bottom}>
          <Text
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.BODY.XS}
          >
            {place}
          </Text>

          <div className={styles.ProductCard_button}>
            <Text 
              colorClass={colorClasses.NEUTRAL['0']}
              type={textTypes.BODY.SM}
            >
              Buy Now
            </Text>
          </div>
        </div>
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
  id: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

export default ProductCard;