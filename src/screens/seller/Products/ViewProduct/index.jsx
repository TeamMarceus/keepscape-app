import React, { useState } from 'react'

import cn from 'classnames';

import { useRouter, useSearchParams } from 'next/navigation';
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
  ConfirmModal, 
  Icon, 
  NoResults, 
  Pagination, 
  RatingStars, 
  ReviewCard, 
  ScreenLoader, 
  Text 
} from '@/components'

import { useProduct, useProductReviews, useUpdateProduct } from '@/hooks';

import PreloaderProductReviews from './Preloader';
import styles from './styles.module.scss'


const sliderSettings = {
  lazyLoad: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

function ViewProduct({ id }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') || 1;

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [clickedRating, setClickedRating] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isDeleteConfirmationToggled, toggleDeleteConfirmation] = useState(false)

  const { isUpdating: isUpdatingProduct, updateProduct} = useUpdateProduct();

  const { 
    isLoading: isProductLoading, 
    product,
    isDeleting,
    deleteProduct,
  } = useProduct(id, isUpdatingProduct);

  const { 
    isLoading: isProductReviewsLoading, 
    reviews, 
    totalPages
  } = useProductReviews({
    productId: id,
    stars: clickedRating === 0 ? null : clickedRating,
    page,
    pageSize: 10,
  });

  const filteredReviews = clickedRating === 0 ? reviews.sort((a, b) => b.rating - a.rating) : reviews;

  if (isProductLoading) {
    return <ScreenLoader/>
  }

  return (
    <>
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
                duration={300}
                offset={-200}
                to="reviews"
              >
              <RatingStars className={styles.ViewProduct_content_info_reviews_stars} rating={product.stars} />
              </Link>
              |
              <Link
                key="reviews"
                smooth
                className={styles.ViewProduct_content_info_link}
                duration={300}
                offset={-200}
                to="reviews"
              >

              <Text colorClass={colorClasses.NEUTRAL['500']}> 
                Rated by: {' '}
                <span className={styles.ViewProduct_content_info_reviews_span}>{product.totalRatings}</span> 
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
                ₱{product.buyerPrice.toLocaleString()}
              </Text>
            </div>
            
            <Text
              className={styles.ViewProduct_content_info_customizable}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XXS}
            >
              {product.isCustomizable ? 'Product is Customizable' : 'Product is not customizable'}
            </Text>
            
            <Text 
              className={styles.ViewProduct_content_info_quantity}
              colorClass={colorClasses.NEUTRAL['400']}
              type={textTypes.HEADING.XXS}
            >
              {product.quantity} pieces available
            </Text>
          
            <Text>
              Province: <span className={styles.ViewProduct_content_info_category}>{product.province.name}</span> 
            </Text>
  
            <Text>
              Categories: {' '} 
              <span className={styles.ViewProduct_content_info_category}>{product.categories.map((category) => category.name).join(', ')}</span>
            </Text>

            <div className={styles.ViewProduct_content_info_buttons}>
              <Button 
                className={styles.ViewProduct_content_info_buttons_button}
                disabled={isUpdatingProduct || isDeleting}
                icon={product.isHidden ? 'visibility' : 'visibility_off'}
                onClick={ async ()=>{
                  const formData = new FormData();
                  formData.append('product', !product.isHidden);

                  await updateProduct({
                      productId: id,
                      body: { 
                          isHidden: formData.get('product'),
                        },
                      isHide: !product.isHidden,
                      isHidden: product.isHidden,
                    })
                  }}
              >
                {product.isHidden ? 'Unhide' : 'Hide'}
              </Button>

              {/* <ButtonLink
                  className={styles.ViewProduct_content_info_buttons_button}
                  disabled={isUpdatingProduct || isDeleting}
                  icon="edit"
                  to={`/seller/products/${id}/update`}
                  type={buttonTypes.PRIMARY.GREEN}
                >
                Update
              </ButtonLink>

              <Button 
                className={styles.ViewProduct_content_info_buttons_button}
                disabled={isUpdatingProduct || isDeleting}
                icon="delete"
                type={buttonTypes.PRIMARY.RED}
                onClick={()=>{
                  toggleDeleteConfirmation(true);
                }}
              >
                Delete
              </Button> */}
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


          {isProductReviewsLoading ? (
            <PreloaderProductReviews/>
          ) : (
            <>
              <div className={styles.ViewProduct_reviews_ratings}>
                <div className={styles.ViewProduct_reviews_rating}>
                  <Text 
                    colorClass={colorClasses.BLUE['400']}
                    type={textTypes.HEADING.XS}
                  > 
                    <span className={styles.ViewProduct_reviews_rating_span}>{product.stars}</span> {' '} 
                    out of 5
                  </Text>
                  <RatingStars rating={product.stars} />
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

              {filteredReviews.length > 0 ? (
                <>
                  {filteredReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      className={styles.ViewProduct_reviews_list}
                      name={review.fullName}
                      rating={review.rating}
                      review={review.review}
                    />
                  ))}

                <Pagination 
                  className={styles.ViewProduct_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);
                    router.push(`/seller/products/${id}?page=${value}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />

                </>
              ) : (
                <NoResults
                  className={styles.ViewProduct_noResults}
                  message="No reviews found"
                />
              )}
            </>
          )}
        </div>
      </div>

      <ConfirmModal
        actions={[
          {
            id: 'deleteProductConfirmButton',
            text: 'Delete',
            type: buttonTypes.PRIMARY.BLUE,
            onClick: async () => {
              await deleteProduct();
              toggleDeleteConfirmation(false);
            },
            disabled: isDeleting,
          },
          {
            id: 'deleteProductConfirmButton',
            text: 'Back',
            type: buttonTypes.SECONDARY.BLUE,
            onClick: () => toggleDeleteConfirmation(false),
          },
        ]}
        body="Are you sure you want to delete this product?"
        handleClose={() => {
          toggleDeleteConfirmation(false);
        }}
        isOpen={isDeleteConfirmationToggled}
        title="Delete?"
      />
    </>
  )
}

ViewProduct.propTypes = {
  id: PropTypes.string.isRequired,
}

export default ViewProduct