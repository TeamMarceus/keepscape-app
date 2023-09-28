import React, { useState } from 'react'

import { useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { colorClasses, textTypes } from '@/app-globals';
import { CardImage, Checkbox, Filters, Icon, Pagination, Text } from '@/components'
import ProductCard from '@/components/ProductCard';
import { getUser } from '@/ducks';

import styles from './styles.module.scss'

const products = [
  {
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/300',
    price: 100,
    rating: 4,
    place: 'Cebu, Oslob'
  },
  {
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/300',
    price: 100,
    rating: 5,
    place: 'Cebu, Oslob'
  },
  {
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/300',
    price: 100,
    rating: 3,
    place: 'Cebu, Oslob'
  },
  {
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/300',
    price: 100,
    rating: 2,
    place: 'Cebu, Oslob'
  },
  {
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/300',
    price: 100,
    rating: 1,
    place: 'Cebu, Oslob'
  },
  {
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/300',
    price: 100,
    rating: 4,
    place: 'Cebu, Oslob'
  },
  {
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/300',
    price: 100,
    rating: 4,
    place: 'Cebu, Oslob'
  },
  {
    name: 'Butanding Keychain',
    image: 'https://picsum.photos/200/300',
    price: 100,
    rating: 4,
    place: 'Cebu, Oslob'
  },
  


]

function Province({ province }) {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.getAll('category');
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
                  image={product.image}
                  name={product.name}
                  place={product.place}
                  price={product.price}
                  rating={product.rating}
                  onClick={() => {}
                      // router.push(`/keepscape/${c.name}`)
                  }
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