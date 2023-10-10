import React, { useState } from 'react'

import cn from 'classnames';

import PropTypes from 'prop-types';
import { Link } from 'react-scroll';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { 
  buttonTypes, 
  colorClasses, 
  textTypes 
} from '@/app-globals';

import { 
  Button, 
  ButtonLink, 
  Card, 
  Checkbox, 
  Icon, 
  RatingStars, 
  ReviewCard, 
  Text 
} from '@/components'

import styles from './styles.module.scss'

const product =
{
  id: '1',
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
  isCustomizable: true,
  isHidden: true,
}

const sliderSettings = {
  lazyLoad: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 1,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies',
  },
  {
    id: 2,
    name: 'Johnny Doe',
    rating: 2,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies',
  },
  {
    id: 3,
    name: 'Alexandra Doe',
    rating: 3,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies',
  },
  {
    id: 4,
    name: 'John Deep',
    rating: 4,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies',
  },
  {
    id: 5,
    name: 'John Doe',
    rating: 5,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies',
  },
  {
    id: 6,
    name: 'Jane Doe',
    rating: 1,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies',
  },
  {
    id: 7,
    name: 'John Doe',
    rating: 2,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies',
  },
  {
    id: 8,
    name: 'John Doe',
    rating: 3,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies',
  },
  {
    id: 9,
    name: 'John Doe',
    rating: 4,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies',
  },
  {
    id: 10,
    name: 'John Doe',
    rating: 5,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies',
  },
];

function ViewProduct({ id }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [clickedRating, setClickedRating] = useState(0)

  const filteredReviews = clickedRating === 0 ? reviews.sort((a, b) => b.rating - a.rating) :
    reviews.filter((review) => review.rating === clickedRating)

  return (
    <div className={styles.ViewProduct}>
      <Card className={styles.ViewProduct_content}>
        <div className={styles.ViewProduct_content_images}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            alt="ViewProduct"
            height={320}
            src={product.images[currentImageIndex]}
            width={400}
          />
          <div className={styles.ViewProduct_content_slider}>
            <Slider {...sliderSettings}>
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={styles.ViewProduct_content_slider_container}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                  <img 
                    alt={product.name}
                    className={cn(styles.ViewProduct_content_slider_image, 
                      {[styles.ViewProduct_content_slider_image___active]: currentImageIndex === index })}
                    height={70}
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

        <div className={styles.ViewProduct_content_info}>
          <div className={styles.ViewProduct_content_info_name}>
            <Text
              type={textTypes.HEADING.SM}
            >
              {product.name}
            </Text> 

            <Icon
              className={styles.ViewProduct_content_info_icon}
              icon={product.isHidden ? 'visibility_off' : 'visibility'}
            />
          </div>
          
          <div className={styles.ViewProduct_content_info_reviews}>
              <Link
                key="rating"
                smooth
                className={styles.ViewProduct_content_info_link}
                duration={700}
                offset={-200}
                to="reviews"
              >
              <RatingStars className={styles.ViewProduct_content_info_reviews_stars} rating={product.rating} />
            </Link>
            |
            <Link
                key="reviews"
                smooth
                className={styles.ViewProduct_content_info_link}
                duration={700}
                offset={-200}
                to="reviews"
              >
              <Text colorClass={colorClasses.NEUTRAL['500']}> 
                Rated by: {' '}
                <span className={styles.ViewProduct_content_info_reviews_span}>{product.numOfReviews}</span> 
                {' '} users
              </Text>
            </Link>
            |
            <Text colorClass={colorClasses.NEUTRAL['500']}> 
              Total sold: {' '}
              <span className={styles.ViewProduct_content_info_reviews_span}>{product.totalSold}</span>
            </Text>
          </div>

          <div className={styles.ViewProduct_content_info_price}>
            <Text 
              colorClass={colorClasses.GREEN['200']}
              type={textTypes.HEADING.MD}
            >
              ₱{product.price}
            </Text>
          </div>
          
          <Checkbox
            checked={product.isCustomizable}
            className={styles.AddProduct_content_bottomGrid_checkbox}
            label="Is this product customizable?"
            name="isCustomizable"
          />
          
          <Text 
            className={styles.ViewProduct_content_info_quantity}
            colorClass={colorClasses.NEUTRAL['400']}
            type={textTypes.HEADING.XS}
          >
            10 pieces available
          </Text>

          <div className={styles.ViewProduct_content_info_buttons}>

            <Button 
              className={styles.ViewProduct_content_info_buttons_button}
              icon="visibility"
              onClick={()=>{}}
            >
              {product.isHidden ? 'Unhide' : 'Hide'}
            </Button>

            <ButtonLink
                className={styles.ViewProduct_content_info_buttons_button}
                icon="edit"
                to={`/seller/products/${id}/update`}
                type={buttonTypes.PRIMARY.GREEN}
              >
              Update
            </ButtonLink>

            <Button 
              className={styles.ViewProduct_content_info_buttons_button}
              icon="delete"
              type={buttonTypes.PRIMARY.RED}
              onClick={()=>{}}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>

      <div className={styles.ViewProduct_description}>
        <Text 
          className={styles.ViewProduct_description_title}
          type={textTypes.HEADING.XXS}
        >
          PRODUCT DESCRIPTION
        </Text>

        <Text>
          {product.description}
        </Text>
      </div>

      <div className={styles.ViewProduct_reviews} id="reviews">
        <Text 
          className={styles.ViewProduct_reviews_title}
          type={textTypes.HEADING.XXS}
        >
          PRODUCT REVIEWS
        </Text>

        <div className={styles.ViewProduct_reviews_ratings}>
          <div className={styles.ViewProduct_reviews_rating}>
            <Text 
              colorClass={colorClasses.BLUE['400']}
              type={textTypes.HEADING.XS}
            > 
              <span className={styles.ViewProduct_reviews_rating_span}>{product.rating}</span> {' '} 
              out of 5
            </Text>
            <RatingStars rating={product.rating} />
          </div>

          <div className={styles.ViewProduct_reviews_buttons}>
            <Button
              className={styles.ViewProduct_reviews_buttons_button}
              type={clickedRating === 0 ? buttonTypes.PRIMARY.BLUE : buttonTypes.SECONDARY.BLUE}
              onClick={()=>{ setClickedRating(0) }}
            >
              All
            </Button>
            <Button
              className={styles.ViewProduct_reviews_buttons_button}
              type={clickedRating === 5 ? buttonTypes.PRIMARY.BLUE : buttonTypes.SECONDARY.BLUE}
              onClick={()=>{ setClickedRating(5) }}
            >
              5 Stars
            </Button>
            <Button
              className={styles.ViewProduct_reviews_buttons_button}
              type={clickedRating === 4 ? buttonTypes.PRIMARY.BLUE : buttonTypes.SECONDARY.BLUE}
              onClick={()=>{ setClickedRating(4) }}
            >
              4 Stars
            </Button>
            <Button
              className={styles.ViewProduct_reviews_buttons_button}
              type={clickedRating === 3 ? buttonTypes.PRIMARY.BLUE : buttonTypes.SECONDARY.BLUE}
              onClick={()=>{ setClickedRating(3) }}
            >
              3 Stars
            </Button>
            <Button
              className={styles.ViewProduct_reviews_buttons_button}
              type={clickedRating === 2 ? buttonTypes.PRIMARY.BLUE : buttonTypes.SECONDARY.BLUE}
              onClick={()=>{ setClickedRating(2) }}
            >
              2 Stars
            </Button>
            <Button
              className={styles.ViewProduct_reviews_buttons_button}
              type={clickedRating === 1 ? buttonTypes.PRIMARY.BLUE : buttonTypes.SECONDARY.BLUE}
              onClick={()=>{ setClickedRating(1) }}
            >
              1 Star
            </Button>
          </div>
        </div>
        
        {
          filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              className={styles.ViewProduct_reviews_list}
              comment={review.comment}
              name={review.name}
              rating={review.rating}
            />
          ))
        }
      </div>
    </div>
  )
}

ViewProduct.propTypes = {
  id: PropTypes.string.isRequired,
}

export default ViewProduct