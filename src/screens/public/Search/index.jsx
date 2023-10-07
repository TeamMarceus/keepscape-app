import React, { useState } from 'react'

import cn from 'classnames';
import { useSearchParams, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { colorClasses, textTypes } from '@/app-globals';
import {  Filters, NoResults, Pagination, Text } from '@/components'
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

function Search({ keyword }) {
  const user = useSelector(getUser);
  const[currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const newSearchParams = new URLSearchParams(searchParams.toString());


  return (
    <div className={styles.Search}>
      <div className={styles.Search_banner}>
        <Text 
          className={styles.Search_banner_text}
          colorClass={colorClasses.NEUTRAL['0']}
          type={textTypes.HEADING.XXL}
        >
          {keyword.toUpperCase()}
        </Text>
      </div>

      <div className={styles.Search_content}>
        <Filters 
          hasPriceRange
          hasRatings
          className={styles.Search_filters}
          icon="menu"
          route="/keepscape/search"
          title="All Products"
        />

        <div className={cn(styles.Search_products, {
          [styles.Search_products_empty]: products.length === 0
        })}>
          {products.length > 0 ?
            <>
              <div className={styles.Search_products_list}>
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
                className={styles.Search_pagination}
                currentPage={currentPage}
                pageJump={(value) => {
                  setCurrentPage(value);
                  
                  newSearchParams.delete('page');
                  newSearchParams.append('page', value);
                  router.push(`/keepscape/search?${newSearchParams.toString()}`, { scroll: false })
                }}
                totalPages={10}
              />
            </>
          :
            <NoResults 
              className={styles.Search_noResults}
              message="No products found"
            />
          }
        </div>

      </div>
    </div>
  )
}

Search.propTypes = {
  keyword: PropTypes.string.isRequired,
}

export default Search