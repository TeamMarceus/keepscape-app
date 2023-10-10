import React, { useState } from 'react'

import cn from 'classnames';
import { useSearchParams, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { colorClasses, textTypes } from '@/app-globals';
import {  Filters, NoResults, Pagination, RatingStars, Text } from '@/components'
import ProductCard from '@/components/ProductCard';
import { getUser } from '@/ducks';

import styles from './styles.module.scss'

const products = [
  {
    id: 1,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/310',
    price: 100,
    rating: 4,
    place: 'Negros Oriental'
  },
  {
    id: 2,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/320',
    price: 100,
    rating: 5,
    place: 'Cebu, Oslob'
  },
  {
    id: 3,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/330',
    price: 100,
    rating: 3,
    place: 'Cebu, Oslob'
  },
  {
    id: 4,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/340',
    price: 100,
    rating: 2,
    place: 'Cebu, Oslob'
  },
  {
    id: 5,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/350',
    price: 100,
    rating: 1,
    place: 'Cebu, Oslob'
  },
  {
    id: 6,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/360',
    price: 100,
    rating: 4,
    place: 'Cebu, Oslob'
  },
  {
    id: 7,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/370',
    price: 100,
    rating: 4,
    place: 'Cebu, Oslob'
  },
  {
    id: 8,
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/380',
    price: 100,
    rating: 4,
    place: 'Cebu, Oslob'
  },
]

function SellerProducts({ id }) {
  const user = useSelector(getUser);
  const[currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  return (
    <div className={styles.SellerProducts}>
      <div className={styles.SellerProducts_banner}>
        <Text 
          className={styles.SellerProducts_banner_text}
          colorClass={colorClasses.NEUTRAL['0']}
          type={textTypes.HEADING.XXL}
        >
          KEYCHAIN SELLER
        </Text>

        <RatingStars 
          className={styles.SellerProducts_banner_rating}
          rating={4}
        />

      <div className={styles.SellerProducts_banner_additional}>
        <Text 
          colorClass={colorClasses.NEUTRAL['200']}
          type={textTypes.HEADING.XXXS}
        >
          Products: {' '}
          <span className={styles.SellerProducts_banner_additional_text}>10</span>
        </Text>

        <Text 
          colorClass={colorClasses.NEUTRAL['200']}
          type={textTypes.HEADING.XXXS}
        >
          Email: {' '}
          <span className={styles.SellerProducts_banner_additional_text}>seller@gmail.com</span>
        </Text>

        <Text 
          colorClass={colorClasses.NEUTRAL['200']}
          type={textTypes.HEADING.XXXS}
        >
          Contact Number: {' '}
          <span className={styles.SellerProducts_banner_additional_text}>0906023213</span>
        </Text>
      </div>
      </div>

      <div className={styles.SellerProducts_content}>
        <Filters 
          hasPriceRange
          hasRatings
          className={styles.SellerProducts_filters}
          icon="menu"
          route="/buyer/seller-products"
          title="All Products"
        />

        <div className={cn(styles.SellerProducts_products, {
          [styles.SellerProducts_products_empty]: products.length === 0
        })}>
          {products.length > 0 ?
            <>
              <div className={styles.SellerProducts_products_list}>
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    isClickable
                    className={styles.Province_products_item}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    place={product.place}
                    price={product.price}
                    rating={product.rating}
                    userGuid={user?.guid}
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
                totalPages={10}
              />
            </>
          :
            <NoResults 
              className={styles.SellerProducts_noResults}
              message="No products found"
            />
          }
        </div>

      </div>
    </div>
  )
}

SellerProducts.propTypes = {
  id: PropTypes.string.isRequired,
}

export default SellerProducts