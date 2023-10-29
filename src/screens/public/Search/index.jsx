import React, { useState } from 'react'

import cn from 'classnames';
import { useSearchParams, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { colorClasses, textTypes } from '@/app-globals';
import {  Filters, NoResults, Pagination, Preloader, Text } from '@/components'
import ProductCard from '@/components/ProductCard';
import { getUser } from '@/ducks';

import { useProducts } from '@/hooks';

import styles from './styles.module.scss'

function Search({ keyword }) {
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
    search: keyword,
    page, 
    pageSize: 15,
    isHidden: false,
    rating: ratings,
    minPrice: minimumPriceParam,
    maxPrice: maximumPriceParam
  });


  return (
    <div className={styles.Search}>
      <div className={styles.Search_banner}>
        <Text 
          className={styles.Search_banner_text}
          colorClass={colorClasses.NEUTRAL['0']}
          type={textTypes.HEADING.XXL}
        >
          {decodeURI(keyword).toUpperCase()}
        </Text>
      </div>

      {isProductsLoading ? (
          <Preloader />
        ) : (
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
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      isClickable
                      className={styles.Search_products_item}
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
                  className={styles.Search_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);
                    
                    newSearchParams.delete('page');
                    newSearchParams.append('page', value);
                    router.push(`/keepscape/search?${newSearchParams.toString()}`, { scroll: false })
                  }}
                  totalPages={totalPages}
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
      )}

    </div>
  )
}

Search.propTypes = {
  keyword: PropTypes.string.isRequired,
}

export default Search