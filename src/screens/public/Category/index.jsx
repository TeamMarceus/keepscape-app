import React, { useState } from 'react'

import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { colorClasses, textTypes } from '@/app-globals';
import {  Filters, Pagination, Text } from '@/components'
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

function Category({ category }) {
  const searchParams = useSearchParams();
  const provinceParams = searchParams.getAll('province');
  const user = useSelector(getUser);
  const[currentPage, setCurrentPage] = useState(1);

  const allProvinces = [
    {
      name: 'bohol',
      isChecked: provinceParams.includes('bohol'),
      label: 'Bohol City',
    },
    {
      name: 'cebu',
      isChecked: provinceParams.includes('cebu'),
      label: 'Cebu City',
    },
    {
      name: 'negros oriental',
      isChecked: provinceParams.includes('negros oriental'),
      label: 'Negros Oriental',
    },
    {
      name: 'siquijor',
      isChecked: provinceParams.includes('siquijor'),
      label: 'Siquijor City',
    }
  ]

  return (
    <div className={styles.Category}>
      <div className={styles.Category_banner}>
        <Text 
          className={styles.Category_banner_text}
          colorClass={colorClasses.NEUTRAL['0']}
          type={textTypes.HEADING.XXL}
        >
          {category.toUpperCase()}
        </Text>
      </div>

      <div className={styles.Category_content}>
        <Filters 
          hasPriceRange
          hasRatings
          category={category}
          checkboxes={allProvinces}
          className={styles.Category_filters}
          icon="menu"
          title="All Products"
          type="By Province"
        />

        <div>  
          <div className={styles.Category_products}>
            <div className={styles.Category_products_list}>
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
          </div>

          <Pagination 
            className={styles.Category_pagination}
            currentPage={currentPage}
            pageJump={(value) => {
              setCurrentPage(value);
              // setQueryParams({ page: value }, true);
            }}
            totalPages={10}
          />
        </div>

      </div>
    </div>
  )
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
}

export default Category