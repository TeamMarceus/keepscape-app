import React, { useState } from 'react'

import cn from 'classnames';
import { useSearchParams, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { colorClasses, textTypes } from '@/app-globals';
import {  Filters, NoResults, Pagination, Preloader, RatingStars, Text } from '@/components'
import ProductCard from '@/components/ProductCard';
import { getUser } from '@/ducks';

import { useProducts, useSellerProfile } from '@/hooks';

import styles from './styles.module.scss'

function SellerProducts({ id }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  const ratings = newSearchParams.get('ratings');
  const minimumPriceParam = newSearchParams.get('minimumPrice');
  const maximumPriceParam = newSearchParams.get('maximumPrice');

  const user = useSelector(getUser);

  const page = searchParams.get('page') || 1;

  const[currentPage, setCurrentPage] = useState(1);

  const {
    isLoading: isProductsLoading, 
    products, 
    totalPages 
  } = useProducts({ 
    page, 
    pageSize: 15,
    isHidden: false ,
    rating: ratings,
    minPrice: minimumPriceParam,
    maxPrice: maximumPriceParam,
    sellerProfileId: id,
  });

  const {isLoading: isSellerProfileLoading, sellerProfile} = useSellerProfile(id);

  return (
    <div className={styles.SellerProducts}>
      {isSellerProfileLoading ? (
          <Preloader/>
        ) : (
          <div className={styles.SellerProducts_banner}>
            <Text 
              className={styles.SellerProducts_banner_text}
              colorClass={colorClasses.NEUTRAL['0']}
              type={textTypes.HEADING.XXL}
            >
              {sellerProfile.name}
            </Text>

            <RatingStars 
              className={styles.SellerProducts_banner_rating}
              rating={sellerProfile.stars}
            />

          <div className={styles.SellerProducts_banner_additional}>
            <Text 
              colorClass={colorClasses.NEUTRAL['200']}
              type={textTypes.HEADING.XXXS}
            >
              Total Products Sold: {' '}
              <span className={styles.SellerProducts_banner_additional_text}>{sellerProfile.totalSold}</span>
            </Text>

            <Text 
              colorClass={colorClasses.NEUTRAL['200']}
              type={textTypes.HEADING.XXXS}
            >
              Email: {' '}
              <span className={styles.SellerProducts_banner_additional_text}>{sellerProfile.email}</span>
            </Text>

            <Text 
              colorClass={colorClasses.NEUTRAL['200']}
              type={textTypes.HEADING.XXXS}
            >
              Contact Number: {' '}
              <span className={styles.SellerProducts_banner_additional_text}>{sellerProfile.phone}</span>
            </Text>
          </div>
          </div>
        )
      }

      <div className={styles.SellerProducts_content}>
        <Filters 
          hasPriceRange
          hasRatings
          className={styles.SellerProducts_filters}
          icon="menu"
          route="/buyer/seller-products"
          title="All Products"
        />
        {isProductsLoading ? (
            <Preloader/>
          ) : (
          <div className={cn(styles.SellerProducts_products, {
            [styles.SellerProducts_products_empty]: products.length === 0
          })}>
            {products.length > 0 ?
              <>
                <div className={styles.SellerProducts_products_list}>
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      isClickable
                      className={styles.SellerProducts_products_item}
                      id={product.id}
                      image={product.imageUrl}
                      name={product.name}
                      place={product.province.name}
                      price={product.price}
                      rating={product.stars}
                      userId={user?.id}
                    />
                  ))}
                </div>

                <Pagination 
                  className={styles.SellerProducts_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);
                    
                    newSearchParams.delete('page');
                    newSearchParams.append('page', value);
                    router.push(`/buyer/seller-products?${newSearchParams.toString()}`, { scroll: false })
                  }}
                  totalPages={totalPages}
                />
              </>
            :
              <NoResults 
                className={styles.SellerProducts_noResults}
                message="No products found"
              />
            }
          </div>
        )}

      </div>
    </div>
  )
}

SellerProducts.propTypes = {
  id: PropTypes.string.isRequired,
}

export default SellerProducts