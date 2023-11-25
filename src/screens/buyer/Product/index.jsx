import React, { useState } from 'react';

import cn from 'classnames';

import { useRouter, useSearchParams } from 'next/navigation';
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
  textTypes,
} from '@/app-globals';

import {
  Button,
  ButtonLink,
  Card,
  ControlledTextArea,
  IconButton,
  NoResults,
  Pagination,
  RatingStars,
  ReviewCard,
  ScreenLoader,
  SellerCard,
  Text,
} from '@/components';

import { textAreaTypes } from '@/components/TextArea/constants';
import { getUser } from '@/ducks';
import { actions as usersActions } from '@/ducks/reducers/users';
import {
  useActionDispatch,
  useAddToCart,
  useProduct,
  useProductReviews,
} from '@/hooks';

import PreloaderProductReviews from '@/screens/seller/Products/ViewProduct/Preloader';

import ReportProductModal from './ReportProductModal';
import styles from './styles.module.scss';

const sliderSettings = {
  lazyLoad: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

function Product({ id }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') || 1;

  const user = useSelector((store) => getUser(store));
  const loginUpdate = useActionDispatch(usersActions.loginActions.loginUpdate);

  const [currentPage, setCurrentPage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [clickedRating, setClickedRating] = useState(0);
  const [isReportProductModalOpen, setIsReportProductModalOpen] =
    useState(false);

  const { isLoading: isAddingToCart, addToCart } = useAddToCart();
  const { isLoading: isProductLoading, product } = useProduct(id);

  const {
    isLoading: isProductReviewsLoading,
    reviews,
    totalPages,
  } = useProductReviews({
    productId: id,
    stars: clickedRating === 0 ? null : clickedRating,
    page,
    pageSize: 10,
  });

  const filteredReviews =
    clickedRating === 0 ? reviews.sort((a, b) => b.rating - a.rating) : reviews;

  if (isProductLoading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <div className={styles.Product}>
        <div className={styles.Product_content}>
          <Card className={styles.Product_content_left}>
            <div className={styles.Product_content_images}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={product.name}
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
                        className={cn(styles.Product_content_slider_image, {
                          [styles.Product_content_slider_image___active]:
                            currentImageIndex === index,
                        })}
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
              <div className={styles.Product_content_info_header}>
                <Text type={textTypes.HEADING.SM}>{product.name}</Text>

                <IconButton
                  icon="flag"
                  iconClassName={styles.Product_content_info_flag}
                  type={iconButtonTypes.ICON.SM}
                  onClick={() => setIsReportProductModalOpen(true)}
                />
              </div>

              <div className={styles.Product_content_info_reviews}>
                <Link
                  key="rating"
                  smooth
                  className={styles.Product_content_info_link}
                  duration={700}
                  offset={-200}
                  to="reviews"
                >
                  <RatingStars
                    className={styles.Product_content_info_reviews_stars}
                    rating={product.stars}
                  />
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
                    Rated by:{' '}
                    <span className={styles.Product_content_info_reviews_span}>
                      {product.totalRatings}
                    </span>{' '}
                    users
                  </Text>
                </Link>
                |
                <Text colorClass={colorClasses.NEUTRAL['500']}>
                  Total sold:{' '}
                  <span className={styles.Product_content_info_reviews_span}>
                    {product.totalSold}
                  </span>
                </Text>
              </div>

              <div className={styles.Product_content_info_price}>
                <Text
                  colorClass={colorClasses.GREEN['200']}
                  type={textTypes.HEADING.MD}
                >
                  ₱{product.buyerPrice.toLocaleString()}
                </Text>
              </div>

              {product.isCustomizable && (
                <ControlledTextArea
                  inputClassName={styles.Product_content_info_customize}
                  name="customize"
                  placeholder="Enter customization details here..."
                  type={textAreaTypes.SLIM}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                />
              )}

              <div className={styles.Product_content_info_quantity}>
                <Text colorClass={colorClasses.NEUTRAL['500']}>Quantity</Text>
                <div className={styles.Product_content_info_quantity_buttons}>
                  <IconButton
                    disabled={quantity <= 1}
                    icon="remove"
                    type={iconButtonTypes.OUTLINE.LG}
                    onClick={() => setQuantity(quantity - 1)}
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
                    onClick={() => setQuantity(quantity + 1)}
                  />
                </div>
                <Text colorClass={colorClasses.NEUTRAL['500']}>
                  {product.quantity} pieces available
                </Text>
              </div>

              <div className={styles.Product_content_info_purchase}>
                <Button
                  className={styles.Product_content_info_purchase_button}
                  disabled={isAddingToCart}
                  icon="add_shopping_cart"
                  type={buttonTypes.SECONDARY.BLUE}
                  onClick={async () => {
                    await addToCart({
                      productId: product.id,
                      quantity,
                      customizationMessage: customInput,
                    });
                  }}
                >
                  Add to cart
                </Button>
                <ButtonLink
                  className={styles.Product_content_info_purchase_button}
                  to={
                    user?.deliveryFullName && user?.deliveryAddress
                      ? `/buyer/checkout?productId=${product.id}`
                      : '/buyer/delivery'
                  }
                  onClick={() => {
                    loginUpdate({
                      checkout_cart: [
                        {
                          id: '1',
                          sellerName: product.seller.name,
                          cartItems: [
                            {
                              // THIS IS THE CART ITEM ID
                              id: '1',
                              productId: product.id,
                              name: product.name,
                              price: product.buyerPrice,
                              quantity,
                              productImageUrl:
                                product.images[currentImageIndex],
                              customizationMessage: customInput,
                              isCustomizable: product.isCustomizable,
                            },
                          ],
                        },
                      ],
                    });
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
              rating={product.seller.stars}
              sellerId={product.seller.sellerProfileId}
              totalSold={product.seller.totalSold}
            />

            <ButtonLink
              className={styles.Product_seller_button}
              to={`/buyer/seller-products?id=${product.seller.sellerProfileId}`}
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

          <Text>{product.description}</Text>
        </div>

        <div className={styles.Product_reviews} id="reviews">
          <Text
            className={styles.Product_reviews_title}
            type={textTypes.HEADING.XXS}
          >
            PRODUCT REVIEWS
          </Text>

          {isProductReviewsLoading ? (
            <PreloaderProductReviews />
          ) : (
            <>
              <div className={styles.Product_reviews_ratings}>
                <div className={styles.Product_reviews_rating}>
                  <Text
                    colorClass={colorClasses.BLUE['400']}
                    type={textTypes.HEADING.XS}
                  >
                    <span className={styles.Product_reviews_rating_span}>
                      {product.stars}
                    </span>{' '}
                    out of 5
                  </Text>
                  <RatingStars rating={product.stars} />
                </div>

                <div className={styles.Product_reviews_buttons}>
                  <Button
                    className={styles.Product_reviews_buttons_button}
                    type={
                      clickedRating === 0
                        ? buttonTypes.PRIMARY.BLUE
                        : buttonTypes.SECONDARY.BLUE
                    }
                    onClick={() => {
                      setClickedRating(0);
                    }}
                  >
                    All
                  </Button>
                  <Button
                    className={styles.Product_reviews_buttons_button}
                    type={
                      clickedRating === 5
                        ? buttonTypes.PRIMARY.BLUE
                        : buttonTypes.SECONDARY.BLUE
                    }
                    onClick={() => {
                      setClickedRating(5);
                    }}
                  >
                    5 Stars
                  </Button>
                  <Button
                    className={styles.Product_reviews_buttons_button}
                    type={
                      clickedRating === 4
                        ? buttonTypes.PRIMARY.BLUE
                        : buttonTypes.SECONDARY.BLUE
                    }
                    onClick={() => {
                      setClickedRating(4);
                    }}
                  >
                    4 Stars
                  </Button>
                  <Button
                    className={styles.Product_reviews_buttons_button}
                    type={
                      clickedRating === 3
                        ? buttonTypes.PRIMARY.BLUE
                        : buttonTypes.SECONDARY.BLUE
                    }
                    onClick={() => {
                      setClickedRating(3);
                    }}
                  >
                    3 Stars
                  </Button>
                  <Button
                    className={styles.Product_reviews_buttons_button}
                    type={
                      clickedRating === 2
                        ? buttonTypes.PRIMARY.BLUE
                        : buttonTypes.SECONDARY.BLUE
                    }
                    onClick={() => {
                      setClickedRating(2);
                    }}
                  >
                    2 Stars
                  </Button>
                  <Button
                    className={styles.Product_reviews_buttons_button}
                    type={
                      clickedRating === 1
                        ? buttonTypes.PRIMARY.BLUE
                        : buttonTypes.SECONDARY.BLUE
                    }
                    onClick={() => {
                      setClickedRating(1);
                    }}
                  >
                    1 Star
                  </Button>
                </div>
              </div>

              {filteredReviews.length > 0 ? (
                <>
                  {filteredReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      className={styles.Product_reviews_list}
                      name={review.fullName}
                      rating={review.rating}
                      review={review.review}
                    />
                  ))}

                  <Pagination
                    className={styles.Product_pagination}
                    currentPage={currentPage}
                    pageJump={(value) => {
                      setCurrentPage(value);
                      router.push(`/buyer/product/${id}?page=${value}`, {
                        scroll: false,
                      });
                    }}
                    totalPages={totalPages}
                  />
                </>
              ) : (
                <NoResults
                  className={styles.Product_noResults}
                  message="No reviews found"
                />
              )}
            </>
          )}
        </div>
      </div>

      {isReportProductModalOpen && (
        <ReportProductModal
          handleClose={() => setIsReportProductModalOpen(false)}
          isOpen={isReportProductModalOpen}
          productId={id}
          title="Report product"
        />
      )}
    </>
  );
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Product;
