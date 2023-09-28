import cn from 'classnames';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { colorClasses, textTypes } from '@/app-globals';
import { ButtonLink, Card, Text} from '@/components';

import styles from './styles.module.scss';

function CardImage({
  onClick = () => {},
  className = null,
  image = null,
  imageString = null,
  imageHeight = null,
  imageWidth,
  name,
  price = null,
  isClickable = false,
}) {
  return (
  
  <Card 
    className={cn(
      styles.CardImage, 
      className
    )}
    isClickable={isClickable}
    onClick={onClick}
  >

    {imageString && 
        // eslint-disable-next-line @next/next/no-img-element
      <img 
        alt={name}
        className={styles.CardImage_imageString}
        src={imageString}
      />
    }
    
    {image && 
      <Image
        alt={name}
        height={imageHeight}
        src={image}
        width={imageWidth}
      />
    }
    <div className={styles.CardImage_info}>
      <Text
        className={styles.CardImage_info_name}
        colorClass={colorClasses.NEUTRAL['600']}
        type={textTypes.BODY.LG}
      >
        {name}
      </Text>

      {price && (
        <Text
          colorClass={colorClasses.RED['200']}
          type={textTypes.BODY.LG}
        >
          {`₱ ${price}`}
        </Text>
      )}
    </div>
  </Card>);
}

CardImage.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  image: PropTypes.any,
  imageString: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  isClickable: PropTypes.bool,
};

export default CardImage;