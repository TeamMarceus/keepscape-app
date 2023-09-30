import React, { useState } from 'react'

import cn from 'classnames';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Slider from 'react-slick';

import { buttonTypes, colorClasses, iconButtonTypes, textTypes } from '@/app-globals';
import { Button, Card, Icon, IconButton, RatingStars, ReviewCard, SellerCard, Text } from '@/components'
import { getUser } from '@/ducks';

import styles from './styles.module.scss'

const product =
{
  id: 1,
  name: 'Butanding Keychain',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies.',
  images: [
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/400',
    'https://picsum.photos/200/500',
    'https://picsum.photos/200/600',
    'https://picsum.photos/200/700',
    'https://picsum.photos/200/800',
  ],
  price: 100,
  rating: 4,
  place: 'Cebu, Oslob',
  numOfReviews: 100,
  totalSold: 1000,
}

const sliderSettings = {
  lazyLoad: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};


function Product({ id }) {
  const user = useSelector(getUser);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className={styles.Product}>
      <div className={styles.Product_content}>
        <div className={styles.Product_content_left}>
          <div className={styles.Product_content_images}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              alt="Product"
              height={350}
              src={product.images[currentImageIndex]}
              width={400}
            />
            <div className={styles.Product_content_slider}>
              <Slider {...sliderSettings}>
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={styles.Product_content_slider}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                    <img 
                      alt={product.name}
                      className={cn(styles.Product_content_slider_image, 
                        {[styles.Product_content_slider_image___active]: currentImageIndex === index })}
                      height={80}
                      src={image}
                      width={70} 
                      onClick={() => setCurrentImageIndex(index)}
                      onMouseEnter={() => setCurrentImageIndex(index)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className={styles.Product_content_info}>
            <Text
              type={textTypes.HEADING.SM}
            >
              {product.name}
            </Text> 
            
            <div className={styles.Product_content_info_reviews}>
              <RatingStars className={styles.Product_content_info_reviews_stars} rating={product.rating} />
              |
              <Text colorClass={colorClasses.NEUTRAL['500']}> 
                Rated by: {' '}
                <span className={styles.Product_content_info_reviews_span}>{product.numOfReviews}</span> 
                {' '} users
              </Text>
              |
              <Text colorClass={colorClasses.NEUTRAL['500']}> 
                Total sold: {' '}
                <span className={styles.Product_content_info_reviews_span}>{product.totalSold}</span>
              </Text>
            </div>

            <div className={styles.Product_content_info_price}>
              <Text 
                colorClass={colorClasses.RED['200']}
                type={textTypes.HEADING.MD}
              >
                ₱{product.price}
              </Text>
            </div>

            <div className={styles.Product_content_info_quantity}>
              <Text colorClass={colorClasses.NEUTRAL['500']}>
                Quantity
              </Text>
              <div className={styles.Product_content_info_quantity_buttons}>
                <IconButton 
                  disabled={quantity <= 1}
                  icon="remove"
                  type={iconButtonTypes.OUTLINE.LG}
                  onClick={()=> setQuantity(quantity - 1)}
                />
                <Text 
                  colorClass={colorClasses.NEUTRAL['400']}
                  type={textTypes.HEADING.XS}
                >
                  {quantity}
                </Text>
                <IconButton 
                  disabled={quantity >= 10}
                  icon="add"
                  type={iconButtonTypes.OUTLINE.LG}
                  onClick={()=> setQuantity(quantity + 1)}
                />
              </div>
              <Text colorClass={colorClasses.NEUTRAL['500']}>
                10 pieces available
              </Text>
            </div>

            <div className={styles.Product_content_info_purchase}>
              <Button 
                className={styles.Product_content_info_purchase_button}
                icon="add_shopping_cart"
                type={buttonTypes.SECONDARY.BLUE}
                onClick={()=>{}}
              >
                Add to cart
              </Button>
              <Button
                className={styles.Product_content_info_purchase_button}
                onClick={()=>{}}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <SellerCard
          className={styles.Product_seller}
          contactNumber="09312355213"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies"
          email="seller@email.com"
          name="John Doe"
          rating={3}
          totalSold={1000}
        />

      </div>

      <div className={styles.Product_description}>
        <Text 
          className={styles.Product_description_title}
          type={textTypes.HEADING.XXS}
        >
          PRODUCT DESCRIPTION
        </Text>

        <Text>
          {product.description}
        </Text>
      </div>

      <div className={styles.Product_reviews}>
        <Text 
          className={styles.Product_reviews_title}
          type={textTypes.HEADING.XXS}
        >
          PRODUCT REVIEWS
        </Text>

        <div className={styles.Product_reviews_ratings}>
          <div className={styles.Product_reviews_rating}>
            <Text 
              colorClass={colorClasses.BLUE['400']}
              type={textTypes.HEADING.XS}
            > 
              <span className={styles.Product_reviews_rating_span}>{product.rating}</span> {' '} 
              out of 5
            </Text>
            <RatingStars rating={product.rating} />
          </div>

          <div className={styles.Product_reviews_buttons}>
            <Button
              className={styles.Product_reviews_buttons_button}
              onClick={()=>{}}
            >
              All
            </Button>
            <Button
              className={styles.Product_reviews_buttons_button}
              onClick={()=>{}}
            >
              5 Stars
            </Button>
            <Button
              className={styles.Product_reviews_buttons_button}
              onClick={()=>{}}
            >
              4 Stars
            </Button>
            <Button
              className={styles.Product_reviews_buttons_button}
              onClick={()=>{}}
            >
              3 Stars
            </Button>
            <Button
              className={styles.Product_reviews_buttons_button}
              onClick={()=>{}}
            >
              2 Stars
            </Button>
            <Button
              className={styles.Product_reviews_buttons_button}
              onClick={()=>{}}
            >
              1 Star
            </Button>
          </div>
        </div>

        <ReviewCard
          className={styles.Product_reviews_list}
          comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies"
          name="John Doe"
          rating={4}
        />

        <ReviewCard
          className={styles.Product_reviews_list}
          comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies"
          name="John Doe"
          rating={4}
        />
      </div>
    </div>
  )
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Product