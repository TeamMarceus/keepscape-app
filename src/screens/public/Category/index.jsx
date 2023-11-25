import React, { useState } from 'react';

import cn from 'classnames';
import { useSearchParams, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { colorClasses, textTypes } from '@/app-globals';
import { Filters, NoResults, Pagination, Preloader, Text } from '@/components';
import ProductCard from '@/components/ProductCard';
import { getUser } from '@/ducks';

import { useProducts } from '@/hooks';

import styles from './styles.module.scss';

function Category({ category }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  const provinceParams = searchParams.getAll('province');
  const ratings = newSearchParams.get('ratings');
  const minimumPriceParam = newSearchParams.get('minimumPrice');
  const maximumPriceParam = newSearchParams.get('maximumPrice');

  const user = useSelector(getUser);

  const page = searchParams.get('page') || 1;
  const [currentPage, setCurrentPage] = useState(1);

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
    },
  ];

  const {
    isLoading: isProductsLoading,
    products,
    totalPages,
  } = useProducts({
    page,
    pageSize: 15,
    isHidden: false,
    categories: [decodeURI(category)],
    provinces:
      provinceParams.length > 0
        ? provinceParams.map((province) => `${decodeURI(province)}`)
        : null,
    rating: ratings,
    minPrice: minimumPriceParam,
    maxPrice: maximumPriceParam,
  });

  return (
    <div className={styles.Category}>
      <div className={styles.Category_banner}>
        <Text
          className={styles.Category_banner_text}
          colorClass={colorClasses.NEUTRAL['0']}
          type={textTypes.HEADING.XXL}
        >
          {decodeURI(category).toUpperCase()}
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
          route={`/keepscape/category/${category}`}
          title="All Products"
          type="By Province"
        />

        {isProductsLoading ? (
          <Preloader />
        ) : (
          <div
            className={cn(styles.Category_products, {
              [styles.Category_products_empty]: products.length === 0,
            })}
          >
            {products.length > 0 ? (
              <>
                <div className={styles.Category_products_list}>
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      isClickable
                      className={styles.Category_products_item}
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
                  className={styles.Category_pagination}
                  currentPage={currentPage}
                  pageJump={(value) => {
                    setCurrentPage(value);

                    newSearchParams.delete('page');
                    newSearchParams.append('page', value);
                    router.push(
                      `/keepscape/category/${category}?${newSearchParams.toString()}`,
                      { scroll: false }
                    );
                  }}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <NoResults
                className={styles.Category_noResults}
                message="No products found"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Category;
