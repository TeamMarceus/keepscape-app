import React, { useState } from 'react'

import cn from 'classnames';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-scroll';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { 
  buttonTypes, 
  colorClasses, 
  iconButtonTypes, 
  textTypes 
} from '@/app-globals';

import { 
  Button, 
  ButtonLink, 
  Card, 
  ControlledTextArea, 
  IconButton, 
  RatingStars, 
  ReviewCard, 
  ScreenLoader, 
  SellerCard, 
  Text 
} from '@/components'

import { textAreaTypes } from '@/components/TextArea/constants';
import { getUser, getDeliveryDetails } from '@/ducks';
import { actions as usersActions } from '@/ducks/reducers/users';
import { useActionDispatch, useProduct } from '@/hooks';

import styles from './styles.module.scss'

// const product =
// {
//   id: '1',
//   name: 'Butanding Keychain',
//   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies.',
//   images: [
//     'https://picsum.photos/200/300',
//     'https://picsum.photos/200/400',
//     'https://picsum.photos/200/500',
//     'https://picsum.photos/200/600',
//     'https://picsum.photos/200/700',
//     'https://picsum.photos/200/800',
//   ],
//   price: 100,
//   rating: 4,
//   place: 'Cebu, Oslob',
//   numOfReviews: 100,
//   totalSold: 1000,
//   isCustomizable: true,
// }

const seller = {
  id: '1',
  name: 'Butanding Store',
  rating: 3,
  totalSold: 1000,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus at erat pretium pretium. Integer id a augue nec diam aliquam ultricies',
  contactNumber: '09312355213',
  email: 'seller@gmail.com'
}

const sliderSettings = {
  lazyLoad: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
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


function Product({ id }) {
  const user = useSelector(getUser);
  const deliveryDetails = useSelector((store) => getDeliveryDetails(store));
  const loginUpdate = useActionDispatch(
    usersActions.loginActions.loginUpdate
  );

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [customInput, setCustomInput] = useState('')
  const [clickedRating, setClickedRating] = useState(0)

  const { isLoading: isProductLoading, product } = useProduct(id);

  const filteredReviews = clickedRating === 0 ? reviews.sort((a, b) => b.rating - a.rating) :
    reviews.filter((review) => review.rating === clickedRating)

  if (isProductLoading) {
    return <ScreenLoader/>
  }

  return (
    <div className={styles.Product}>
      <div className={styles.Product_content}>
        <Card className={styles.Product_content_left}>
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
                    className={styles.Product_content_slider_container}
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
                <Link
                  key="rating"
                  smooth
                  className={styles.Product_content_info_link}
                  duration={700}
                  offset={-200}
                  to="reviews"
                >
                <RatingStars className={styles.Product_content_info_reviews_stars} rating={product.rating} />
              </Link>
              |
              <Link
                  key="reviews"
                  smooth
                  className={styles.Product_content_info_link}
                  duration={700}
                  offset={-200}
                  to="reviews"
                >
                <Text colorClass={colorClasses.NEUTRAL['500']}> 
                  Rated by: {' '}
                  <span className={styles.Product_content_info_reviews_span}>{product.numOfReviews}</span> 
                  {' '} users
                </Text>
              </Link>
              |
              <Text colorClass={colorClasses.NEUTRAL['500']}> 
                Total sold: {' '}
                <span className={styles.Product_content_info_reviews_span}>{product.totalSold}</span>
              </Text>
            </div>

            <div className={styles.Product_content_info_price}>
              <Text 
                colorClass={colorClasses.GREEN['200']}
                type={textTypes.HEADING.MD}
              >
                ₱{product.price}
              </Text>
            </div>
            
            {product.isCustomizable && 
              <ControlledTextArea
                inputClassName={styles.Product_content_info_customize}
                name="customize"
                placeholder="Enter customization details here..."
                type={textAreaTypes.SLIM}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
              />
            }

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
                  disabled={quantity >= product.quantity}
                  icon="add"
                  type={iconButtonTypes.OUTLINE.LG}
                  onClick={()=> setQuantity(quantity + 1)}
                />
              </div>
              <Text colorClass={colorClasses.NEUTRAL['500']}>
                {product.quantity} pieces available
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
              <ButtonLink
                className={styles.Product_content_info_purchase_button}
                to={deliveryDetails?.fullName ? '/buyer/checkout' : '/buyer/delivery'}
                onClick={()=>{
                  loginUpdate({
                    checkout_cart: [
                      {
                        id: '1',
                        seller: seller.name,
                        products: [
                          {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity,
                            image: product.images[currentImageIndex],
                            customization: customInput,
                          }
                        ]
                      }
                    ]
                  })
                }}
              >
                Buy Now
              </ButtonLink>
            </div>
          </div>
        </Card>
        <div className={styles.Product_seller}>
          <SellerCard
            contactNumber={product.seller.phone}
            description={product.seller.description}
            email={product.seller.email}
            name={product.seller.name}

            // TODO: replace with actual rating
            rating={seller.rating}
            sellerId={seller.id}
            totalSold={seller.totalSold}
          />

          <ButtonLink
            className={styles.Product_seller_button}
            // TODO: replace with actual ID
            to={`/buyer/seller-products?id=${seller.id}`}
            type={buttonTypes.SECONDARY.BLUE}
          >
            Seller's Products
          </ButtonLink>
        </div>

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

      <div className={styles.Product_reviews} id="reviews">
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
              type={clickedRating === 0 ? buttonTypes.PRIMARY.BLUE : buttonTypes.SECONDARY.BLUE}
              onClick={()=>{ setClickedRating(0) }}
            >
              All
            </Button>
            <Button
              className={styles.Product_reviews_buttons_button}
              type={clickedRating === 5 ? buttonTypes.PRIMARY.BLUE : buttonTypes.SECONDARY.BLUE}
              onClick={()=>{ setClickedRating(5) }}
            >
              5 Stars
            </Button>
            <Button
              className={styles.Product_reviews_buttons_button}
              type={clickedRating === 4 ? buttonTypes.PRIMARY.BLUE : buttonTypes.SECONDARY.BLUE}
              onClick={()=>{ setClickedRating(4) }}
            >
              4 Stars
            </Button>
            <Button
              className={styles.Product_reviews_buttons_button}
              type={clickedRating === 3 ? buttonTypes.PRIMARY.BLUE : buttonTypes.SECONDARY.BLUE}
              onClick={()=>{ setClickedRating(3) }}
            >
              3 Stars
            </Button>
            <Button
              className={styles.Product_reviews_buttons_button}
              type={clickedRating === 2 ? buttonTypes.PRIMARY.BLUE : buttonTypes.SECONDARY.BLUE}
              onClick={()=>{ setClickedRating(2) }}
            >
              2 Stars
            </Button>
            <Button
              className={styles.Product_reviews_buttons_button}
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
              className={styles.Product_reviews_list}
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

Product.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Product