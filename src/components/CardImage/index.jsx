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
  isClicked = false,
  isClickable = false,
  buttonLink = null,
}) {
  return (
  
  <Card 
    className={cn(
      styles.CardImage, 
      className, 
      isClicked && styles.CardImage___clicked
    )}
    isClickable={isClickable}
    onClick={onClick}
  >

    {imageString && 
        // eslint-disable-next-line @next/next/no-img-element
      <img 
        alt={name}
        src={imageString}
        style={{ height: imageHeight, width: imageWidth }}
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

    <Text
      colorClass={colorClasses.NEUTRAL['600']}
      type={(image || imageString) ? textTypes.BODY.MD : textTypes.HEADING.LG}
    >
      {name}
    </Text>

    {price && (
      <Text
        colorClass={colorClasses.RED['700']}
        type={textTypes.HEADING.XXS}
      >
        {`₱${price}`}
      </Text>
    )}

    {buttonLink && (
      <ButtonLink
        className={styles.CardImage_button}
        to={buttonLink}
      >
        PURCHASE
      </ButtonLink>
    )}
  </Card>);
}

CardImage.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  image: PropTypes.any,
  imageString: PropTypes.string,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  isClicked: PropTypes.bool,
  isClickable: PropTypes.bool,
  buttonLink: PropTypes.string,
};

export default CardImage;