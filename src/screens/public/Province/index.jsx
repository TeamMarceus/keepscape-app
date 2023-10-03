import React, { useState } from 'react'

import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { colorClasses, textTypes } from '@/app-globals';
import { Filters, Pagination, Text } from '@/components'
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
    place: 'Cebu, Oslob'
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

function Province({ province }) {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.getAll('category');
  const user = useSelector(getUser);
  const[currentPage, setCurrentPage] = useState(1);

  const allCategories = [
    {
      name: 'necklaces',
      isChecked: categoryParams.includes('necklaces'),
      label: 'Necklaces',
    },
    {
      name: 't-shirts',
      isChecked: categoryParams.includes('t-shirts'),
      label: 'T-Shirts',
    },
    {
      name: 'mugs',
      isChecked: categoryParams.includes('mugs'),
      label: 'Mugs',
    },
    {
      name: 'keychains',
      isChecked: categoryParams.includes('keychains'),
      label: 'Keychains',
    }
  ]

  return (
    <div className={styles.Province}>
      <div className={styles.Province_banner}>
        <Text 
          className={styles.Province_banner_text}
          colorClass={colorClasses.NEUTRAL['0']}
          type={textTypes.HEADING.XXL}
        >
          {province.toUpperCase()}
        </Text>
      </div>

      <div className={styles.Province_content}>
        <Filters 
          hasPriceRange
          hasRatings
          checkboxes={allCategories}
          className={styles.Province_filters}
          icon="menu"
          province={province}
          title="All Products"
          type="By Category"
        />

        <div>
          <div className={styles.Province_products}>
            <div className={styles.Province_products_list}>
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
            className={styles.Province_pagination}
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

Province.propTypes = {
  province: PropTypes.string.isRequired,
}

export default Province